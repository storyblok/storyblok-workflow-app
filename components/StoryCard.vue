<template>
  <div :style="stageColorData" class="bg-white shadow rounded px-3 pt-3 pb-5 border border-t-8">
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        {{ story.name }}
        <span
          class="text-gray-700 font-normal text-xs block"
        >({{ story.full_slug }})</span>
      </p>

      <img
        :src="avatarUrl"
        :alt="`Last author ${lastAuthor.friendly_name}`"
        v-if="lastAuthor.avatar"
        class="w-8 h-8 rounded-full"
      >
    </div>

    <div class="flex mt-4 justify-between items-center">
      <p class="text-sm text-gray-600">
        {{ story.updated_at | formatDate }}
      </p>

      <Bagde v-if="story.unpublished_changes">
        Unpublished Changes
      </Bagde>
    </div>
  </div>
</template>

<script>
import Bagde from './Bagde'

const abbrev = [
  'Jan',
  'Fev',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export default {
  name: 'StoryCard',
  components: { Bagde },
  filters: {
    formatDate (val) {
      const date = new Date(val)
      return `${abbrev[date.getMonth()]} ${date.getDate()}`
    }
  },
  props: {
    story: {
      type: Object,
      default: () => ({})
    },
    stageColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    lastAuthor () {
      return this.story.last_author || {}
    },
    avatarUrl () {
      return `https://img2.storyblok.com/72x72/${this.lastAuthor.avatar}`
    },
    stageColorData () {
      return {
        'border-color': this.stageColor
      }
    }
  }
}
</script>
