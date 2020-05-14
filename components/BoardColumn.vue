<template>
  <div class="bg-gray-300 rounded-lg px-3 py-3 rounded mr-4 shadow column-width">
    <p
      class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
    >
      {{ stage.name }}
    </p>

    <Draggable
      :list="stories"
      @change="onChange"
      ghost-class="ghost-card"
      group="stories"
    >
      <StoryCard
        v-for="story in stories"
        :key="story.id"
        :story="story"
        :stage-color="stage.color"
        class="mt-3 cursor-move"
      />
    </Draggable>
  </div>
</template>

<script>
import axios from 'axios'
import Draggable from 'vuedraggable'
import StoryCard from '@/components/StoryCard'

export default {
  name: 'BoardColumn',
  components: { Draggable, StoryCard },
  props: {
    stage: {
      type: Object,
      default: () => ({})
    },
    spaceId: {
      type: [Number, String],
      default: null
    }
  },
  computed: {
    stageId () {
      return this.stage.id
    },
    stageName () {
      return this.stage.name
    },
    stories () {
      return this.stage.stories
    }
  },
  methods: {
    onChange (data) {
      if (data.added) {
        const story = data.added.element || {}
        this.updateWorkflowStage(story)
      }
    },
    updateWorkflowStage (story) {
      const url = `/auth/explore/spaces/${this.spaceId}/workflow_stage_changes`

      const data = {
        workflow_stage_change: {
          story_id: story.id,
          workflow_stage_id: this.stageId
        }
      }

      return axios.post(url, data)
        .then(() => {
          console.log(`Story ${story.id} updated to stage id ${this.stageId}`)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<style>
.column-width {
  min-width: 320px;
  width: 320px;
}

.ghost-card {
  @apply border opacity-50 border-blue-500 bg-gray-200;
}
</style>
