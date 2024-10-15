<template>
  <div class="relative w-full h-24 overflow-hidden z-20">
    <div
      v-for="i in 3"
      :key="i"
      class="absolute inset-0 opacity-70"
      :class="[`animate-ripple-${i}`]"
    >
      <svg
        class="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path :d="generateWavePath(i)" fill="currentColor" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const generateWavePath = (waveIndex) => {
  return computed(() => {
    const amplitude = 4 - waveIndex; // 振幅
    const frequency = 0.02 + waveIndex * 0.01; // 频率
    let d = `M 0 ${50 + amplitude * Math.sin(0)} `;

    for (let i = 0; i <= 100; i++) {
      d += `L ${i} ${50 + amplitude * Math.sin(i * frequency)} `;
    }

    d += "L 100 100 L 0 100 Z";
    return d;
  });
};
</script>

<style scoped>
@keyframes ripple-1 {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes ripple-2 {
  0% {
    transform: translateX(-85%);
  }
  100% {
    transform: translateX(85%);
  }
}

@keyframes ripple-3 {
  0% {
    transform: translateX(-70%);
  }
  100% {
    transform: translateX(70%);
  }
}

.animate-ripple-1 {
  animation: ripple-1 7s infinite linear;
}

.animate-ripple-2 {
  animation: ripple-2 11s infinite linear;
}

.animate-ripple-3 {
  animation: ripple-3 13s infinite linear;
}
</style>
