<template>
  <div
    :class="
      isDanger
        ? 'border-red-700 bg-red-100 text-red-900'
        : 'border-blue-700 bg-blue-100 text-blue-900'
    "
    class="py-4 px-6 border border-t-4 rounded-b text-center text-lg shadow-md"
    role="alert"
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
    isDanger () {
      return this.type === 'danger'
    }
  }
}
</script>
