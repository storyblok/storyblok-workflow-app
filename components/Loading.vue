<template>
  <div>
    <p>
      <span class="bounceball" />
      <span class="ml-4 text-lg text-gray-800"> {{ message }} </span>
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

<style>
/* effect by https://codepen.io/wabeshew/full/XdbBdM */
.bounceball {
  @apply relative inline-block w-6 h-12;
}

.bounceball:before {
  content: '';
  border-radius: 50%;
  transform-origin: 50%;
  animation: bounce 500ms alternate infinite ease;
  @apply absolute block top-0 w-6 h-6 bg-gray-500;
}

@keyframes bounce {
  0% {
    top: 50px;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    transform: scaleX(2);
  }
  35% {
    height: 15px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0;
  }
}
</style>
