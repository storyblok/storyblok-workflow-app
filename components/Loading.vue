<template>
  <div class="py-4 px-6 text-center border border-2 border-blue-500 shadow">
    <p class="">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    message: {
      type: String,
      default: ''
    }
  }
}
</script>
