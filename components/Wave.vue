<template>
  <div class="relative">
    <div
      class="wave-animation h-[80px]"
      style="background-image: url(/wave1.png)"
    ></div>
    <div
      class="wave-animation h-[80px]"
      style="background-image: url(/wave2.png)"
    ></div>
    <div
      class="absolute inset-0 h-[60px] bg-black bg-opacity-70 hidden dark:block"
    ></div>
  </div>
</template>

<script setup>
onMounted(() => {
  const waves = document.querySelectorAll(".wave-animation");
  waves.forEach((wave) => {
    const img = new Image();
    img.src = wave.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    img.onload = () => {
      const imgWidth = img.width;
      wave.style.setProperty("--bg-width", `${imgWidth}px`);
    };
  });
});
</script>

<style scoped>
@reference "assets/css/tailwind.css";

@keyframes wave {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: var(--bg-width, 100%);
  }
}

.wave-animation {
  @apply overflow-hidden absolute left-0 right-0;
  background-repeat: repeat-x;
  animation: wave 5s linear infinite;
}

.wave-animation:nth-child(2) {
  animation-duration: 8s;
}
</style>
