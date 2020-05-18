<template>
  <div
    :class="typeClass"
    class="py-4 px-6 border border-2 text-center text-lg"
  >
    <p>
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    typeClass () {
      if (this.type === 'danger') {
        return 'border-red-500 text-red-500'
      }

      return 'border-blue-500 text-blue-500'
    }
  }
}
</script>
