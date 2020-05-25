<template>
  <div
    class="px-3 h-6 rounded-full text-xs flex items-center bg-red-100 text-red-700"
  >
    <span class="w-2 h-2 rounded-full mr-1 bg-red-400"/>

    <span>
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'Badge'
}
</script>
