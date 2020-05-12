<template>
  <div class="bg-gray-300 p-6 h-screen w-screen">
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
      <div class="min-h-screen flex overflow-x-scroll">
        <div
          v-for="stage in workflowStages"
          :key="stage.id"
          class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
        >
          <p
            class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
          >
            {{ stage.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Message from '@/components/Message'

export default {
  name: 'IndexPage',
  components: { Message },
  data: () => ({
    spaceId: null,
    loading: false,
    error: false,
    workflowStages: []
  }),
  computed: {
    hasData () {
      return this.workflowStages.length > 0 && !this.error && !this.loading
    }
  },
  mounted () {
    if (window.top === window.self) {
      window.location.assign('https://app.storyblok.com/oauth/app_redirect')
    } else {
      this.loadSpaceIdFromUrl()

      this.$nextTick(() => {
        this.loadWorkflowStages()
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
          this.workflowStages = response.data.workflow_stages || []
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    }
  }
}
</script>

<style>
</style>
