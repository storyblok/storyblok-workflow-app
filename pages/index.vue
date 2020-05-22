<template>
  <div class="bg-white py-6 min-h-screen flex flex-col">
    <div
      v-if="loading"
      class="flex flex-1 justify-center items-center"
    >
      <Loading message="Loading Workflow Stages..." />
    </div>

    <template v-else>
      <div class="px-6 mb-6">
        <p v-if="hasCurrentUser">
          Welcome <span class="text-teal-700">{{ userName }}</span> to the workflow manager app.
        </p>

        <Checkbox
          v-model="onlyAssignedToMe"
          label="View only stories assigned to me"
          class="mt-2"
        />
      </div>

      <div class="flex-1 px-6 mb-6 flex overflow-x-scroll">
        <div
          v-if="!hasData"
          class="flex justify-center items-center flex-col w-full"
        >
          <Message
            type="info"
            message="There are no workflow stages configured"
          />

          <button
            @click="loadData"
            class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Reload
          </button>
        </div>

        <template v-else>
          <BoardColumn
            v-for="stage in workflowsProcessed"
            :key="stage.id"
            :stage="stage"
            :space-id="spaceId"
          />
        </template>
      </div>
    </template>

    <AppFooter />
  </div>
</template>

<script>
import axios from 'axios'
import AppFooter from '@/components/AppFooter'
import Message from '@/components/Message'
import Loading from '@/components/Loading'
import BoardColumn from '@/components/BoardColumn'
import Checkbox from '@/components/Checkbox'

export default {
  name: 'IndexPage',
  components: { AppFooter, BoardColumn, Loading, Message, Checkbox },
  data: () => ({
    spaceId: null,
    loading: true,
    hasUserError: false,
    hasStoriesError: false,
    hasWorkflowError: false,
    stories: [],
    workflowsProcessed: [],
    currentUser: {},
    onlyAssignedToMe: true
  }),
  computed: {
    hasData () {
      return this.workflowsProcessed.length > 0 && !this.hasError && !this.loading
    },
    hasError () {
      return this.hasUserError || this.hasStoriesError || this.hasWorkflowError
    },
    hasCurrentUser () {
      return Object.values(this.currentUser).length > 0
    },
    userData () {
      return this.hasCurrentUser ? this.currentUser.user : {}
    },
    userName () {
      if (this.hasCurrentUser) {
        return this.userData.friendly_name || ''
      }

      return ''
    }
  },
  watch: {
    onlyAssignedToMe: 'loadData'
  },
  mounted () {
    if (window.top === window.self) {
      window.location.assign('https://app.storyblok.com/oauth/app_redirect')
    } else {
      this.loadSpaceIdFromUrl()

      this.$nextTick(this.loadData)
    }
  },
  methods: {
    loadSpaceIdFromUrl () {
      this.spaceId = this.$route.query.space_id || null
    },
    async loadData () {
      this.clearErrors()

      this.loading = true
      const workflows = await this.loadWorkflowStages()
      this.stories = await this.loadStories()
      await this.getUserInfo()

      this.processStories(workflows, this.stories)

      this.loading = false
    },
    loadWorkflowStages () {
      const url = `/auth/explore/spaces/${this.spaceId}/workflow_stages`

      return axios
        .get(url)
        .then((response) => {
          this.hasWorkflowError = false
          const workflowStages = response.data.workflow_stages || []

          return Promise.resolve(workflowStages)
        })
        .catch(() => {
          this.hasWorkflowError = true
        })
    },
    async loadStories () {
      const perPage = 25
      const url = `/auth/explore/spaces/${this.spaceId}/stories`
      let page = 1

      let res = await axios.get(url, this.getStoriesConfig(page))
      const total = res.data.total
      const lastPage = Math.ceil((total / perPage))
      let all = res.data.stories

      while (page < lastPage) {
        page++
        res = await axios.get(url, this.getStoriesConfig(page))
        all = [
          ...all,
          ...res.data.stories
        ]
      }

      this.hasUserError = false

      return all
    },
    processStories (workflows = [], stories = []) {
      const workflowsProcessed = workflows.reduce((acc, workflow) => {
        acc[workflow.id] = {
          ...workflow,
          stories: []
        }

        return acc
      }, {})

      for (const story of stories) {
        if (story.stage) {
          const stageId = story.stage.workflow_stage_id || null

          workflowsProcessed[stageId].stories.push(story)
        }
      }

      this.workflowsProcessed = Object.values(workflowsProcessed)
    },
    getUserInfo () {
      return axios
        .get('/auth/user')
        .then((response) => {
          this.hasUserError = false
          this.currentUser = response.data
        })
        .catch((err) => {
          this.hasUserError = true
          console.error(err) // eslint-disable-line
        })
    },
    clearErrors () {
      this.hasUserError = false
      this.hasStoriesError = false
      this.hasWorkflowError = false
    },
    getStoriesConfig (page) {
      const params = {
        page
      }

      if (this.onlyAssignedToMe) {
        params.mine = true
      }

      return { params }
    }
  }
}
</script>

<style>
</style>
