<template>
  <FullLoading
    v-if="isFullLoading || !isAnimationComplete"
    v-model:ifLoad="isFullLoading"
  />
  <TopLoading></TopLoading>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | Liros的日记本 | 全栈开发`
      : "Liros的日记本 | 全栈开发";
  },
});
const nuxtApp = useNuxtApp();

// 是否首次加载
const isFullLoading = ref(true);

const isAnimationComplete = ref(false);

nuxtApp.hook("page:start", () => {
  isFullLoading.value = true;
  isAnimationComplete.value = false;
});

nuxtApp.hook("page:finish", () => {
  isFullLoading.value = false;
  setTimeout(() => {
    isAnimationComplete.value = true;
  }, 500);
});
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
}

/* 设置滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  @apply bg-gray-400 dark:bg-gray-600 border-[2px] border-solid border-transparent bg-clip-content rounded-md;
}

body {
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  scroll-behavior: smooth;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.6s ease-out;
}

.page-leave-to {
  transform: opcacity(0);
  filter: blur(10px);
  transition-delay: 200ms;
}
.page-enter-from {
  transform: opcacity(0);
  filter: blur(10px);
}

.page-enter-to {
  transform: opcacity(1);
  filter: blur(0);
}

.page-leave-from {
  transform: opcacity(1);
  filter: blur(0);
}
</style>
