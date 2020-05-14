<template>
  <div class="bg-white py-6 min-h-screen flex flex-col">
    <div
      v-if="loading"
      class="flex flex-1 justify-center items-center"
    >
      <Loading message="Loading Workflow Stages..." />
    </div>

    <template v-else>
      <div class="flex-1 px-6 mb-6 flex overflow-x-scroll">
        <div
          v-if="!hasData"
          class="flex justify-center items-center"
        >
          <Message
            type="info"
            message="There are no workflow stages configured"
          />
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
import Loading from '@/components/Loading'
import BoardColumn from '@/components/BoardColumn'

export default {
  name: 'IndexPage',
  components: { AppFooter, Loading, BoardColumn },
  data: () => ({
    spaceId: null,
    loading: true,
    error: false,
    stories: [],
    workflowsProcessed: []
  }),
  computed: {
    hasData () {
      return this.workflowsProcessed.length > 0 && !this.error && !this.loading
    }
  },
  mounted () {
    if (window.top === window.self) {
      window.location.assign('https://app.storyblok.com/oauth/app_redirect')
    } else {
      this.loadSpaceIdFromUrl()

      this.$nextTick(async () => {
        this.loading = true
        const workflows = await this.loadWorkflowStages()
        const stories = await this.loadStories()

        this.processStories(workflows, stories)

        this.loading = false
      })
    }
  },
  methods: {
    loadSpaceIdFromUrl () {
      this.spaceId = this.$route.query.space_id || null
    },
    loadWorkflowStages () {
      const url = `/auth/explore/spaces/${this.spaceId}/workflow_stages`

      return axios
        .get(url)
        .then((response) => {
          const workflowStages = response.data.workflow_stages || []

          return Promise.resolve(workflowStages)
        })
        .catch(() => {
          this.error = true
        })
    },
    loadStories () {
      const url = `/auth/explore/spaces/${this.spaceId}/stories`

      return axios
        .get(url)
        .then((response) => {
          this.stories = response.data.stories

          return Promise.resolve(this.stories)
        })
        .catch(() => {
          this.error = true
        })
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
    }
  }
}
</script>

<style>
</style>
