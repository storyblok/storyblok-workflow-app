<template>
  <div
    :style="stageColorData"
    class="bg-white shadow rounded px-3 pt-3 pb-5 border border-t-8"
  >
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        {{ story.name }}

        <span class="text-gray-700 font-normal text-xs block">
          ({{ story.full_slug }})
        </span>
      </p>

      <img
        :src="avatarUrl"
        :alt="`Last author ${lastAuthor.friendly_name}`"
        class="w-8 h-8 rounded-full"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoryCard',
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
