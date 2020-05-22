<template>
  <div
    :class="typeClass"
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
    typeClass () {
      const colorBase = this.type === 'danger' ? 'red' : 'blue'

      return `border-${colorBase}-700 bg-${colorBase}-100 text-${colorBase}-900`
    }
  }
}
</script>
