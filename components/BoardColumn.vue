<template>
  <div class="bg-gray-300 rounded-lg px-3 py-3 column-width rounded mr-4 shadow column-width">
    <p
      class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
    >
      {{ stage.name }}
    </p>

    <Draggable
      v-model="stage.stories"
      ghost-class="ghost-card"
      group="stories"
    >
      <StoryCard
        v-for="story in stage.stories"
        :key="story.id"
        :story="story"
        :stage-color="stage.color"
        class="mt-3 cursor-move"
      />
    </Draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import StoryCard from '@/components/StoryCard'

export default {
  name: 'BoardColumn',
  components: { Draggable, StoryCard },
  props: {
    stage: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    stageId () {
      return this.stage.id
    },
    stageName () {
      return this.stage.name
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
