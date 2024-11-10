<template>
  <div
    class="fixed z-50 top-0 left-0 h-[5px] bg-pink-300 rounded-md progress"
  ></div>
</template>

<style scoped>
@keyframes grow-progress {
  from {
    width: 0;
  }
  to {
    width: 100vw;
  }
}

.progress {
  animation: grow-progress 3s linear;
  animation-timeline: scroll(root);
}
</style>
