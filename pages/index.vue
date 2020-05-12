<template>
  <div class="bg-white p-6 min-h-screen">
    <Message
      v-if="loading"
      message="Loading Workflow Stages..."
    />

    <Message
      v-if="!hasData"
      type="info"
      message="There are no workflow stages configured"
    />

    <div v-if="hasData">
      <Message
        v-if="storiesWithoutStage > 0"
        :message="`There are ${storiesWithoutStage} stories without stage`"
        type="info"
        class="mb-4"
      />

      <div class="min-h-screen flex overflow-x-scroll">
        <div
          v-for="stage in workflowsProcessed"
          :key="stage.id"
          class="bg-gray-300 rounded-lg px-3 py-3 column-width rounded mr-4 shadow column-width"
        >
          <p
            class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
          >
            {{ stage.name }}
          </p>

          <StoryCard
            v-for="story in stage.stories"
            :key="story.id"
            :story="story"
            :stage-color="stage.color"
            class="mt-3 cursor-move"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Message from '@/components/Message'
import StoryCard from '@/components/StoryCard'

export default {
  name: 'IndexPage',
  components: { Message, StoryCard },
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
    },
    storiesInStage () {
      return this.workflowsProcessed.reduce((acc, workflow) => {
        return acc + workflow.stories.length
      }, 0)
    },
    storiesWithoutStage () {
      return this.stories.length - this.storiesInStage
    }
  },
  mounted () {
    if (window.top === window.self) {
      window.location.assign('https://app.storyblok.com/oauth/app_redirect')
    } else {
      this.loadSpaceIdFromUrl()

      this.$nextTick(async () => {
        const workflows = await this.loadWorkflowStages()
        const stories = await this.loadStories()

        this.processStories(workflows, stories)
      })
    }
  },
  methods: {
    loadSpaceIdFromUrl () {
      this.spaceId = this.$route.query.space_id || null
    },
    loadWorkflowStages () {
      this.loading = true

      const url = `/auth/explore/spaces/${this.spaceId}/workflow_stages`

      return axios
        .get(url)
        .then((response) => {
          this.loading = false
          const workflowStages = response.data.workflow_stages || []

          return Promise.resolve(workflowStages)
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    },
    loadStories () {
      const url = `/auth/explore/spaces/${this.spaceId}/stories`

      return axios
        .get(url)
        .then((response) => {
          this.loading = false
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

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}
</style>
