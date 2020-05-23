<template>
  <div :class="{ 'active' : activeToast }" class="toast">
    <Message v-bind="{ type, message }" />
  </div>
</template>

<script>
import Message from './Message'

export default {
  name: 'Toast',
  components: { Message },
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    },
    time: {
      type: Number,
      default: 5000
    }
  },
  data: () => ({
    activeToast: false
  }),
  beforeDestroy () {
    clearTimeout(this.internalTimeout)
  },
  methods: {
    show () {
      this.activeToast = true

      this.triggerTimeout()
    },
    triggerTimeout () {
      this.internalTimeout = setTimeout(() => {
        this.activeToast = false

        clearTimeout(this.internalTimeout)
      }, this.time)
    }
  }
}
</script>

<style scoped>
.toast {
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  max-width: 500px;
  transform: translate(-50%, -200%);
  transition: all 0.6s ease;
}

.toast.active {
  transform: translate(-50%, 15%);
}
</style>
