<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        {{ story.name }}
      </p>
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
    }
  }
}
</script>
