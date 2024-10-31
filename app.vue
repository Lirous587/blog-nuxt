<template>
  <FullLoading v-if="isFullLoading" />
  <NuxtLayout>
    <NuxtLoadingIndicator :height="2" color="#409eff" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
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

nuxtApp.hook("page:start", () => {
  isFullLoading.value = true;
});

nuxtApp.hook("page:finish", () => {
  isFullLoading.value = false;
});
</script>

<style>
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
