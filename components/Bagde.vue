<template>
  <div
    :class="`bg-${color}-100 text-${color}-700`"
    class="px-3 h-6 rounded-full text-xs flex items-center"
  >
    <span
      :class="`bg-${color}-400`"
      class="w-2 h-2 rounded-full mr-1"
    />

    <span>
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    color: {
      type: String,
      default: 'red'
    }
  }
}
</script>
