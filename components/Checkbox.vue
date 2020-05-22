<template>
  <div class="flex items-center">
    <label class="block">
      <input
        @change="onChange"
        :checked="value"
        class="mr-2"
        type="checkbox"
      >

      <span>
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange (event) {
      this.$emit('input', event.target.checked)
    }
  }
}
</script>

<style>

</style>
