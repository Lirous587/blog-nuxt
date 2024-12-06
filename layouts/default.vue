<template>
  <div>
    <UserNavHeader> </UserNavHeader>

    <BackgroundType> </BackgroundType>

    <div class="pt-10 transition-all duration-300 bg-white dark:bg-black flex">
      <aside class="sticky-aside">
        <UserNavAside></UserNavAside>
      </aside>
      <!-- 此处加一个w-0 通知子元素可以在父元素发生溢出 -->
      <main class="w-0 flex-1 mx-1 md:mx-2 lg:mx-4">
        <slot />
      </main>
    </div>

    <div class="fixed bottom-0 left-0 right-0 h-[60px] pointer-events-none">
      <Wave />
    </div>

    <FixedTool v-if="route.path.split('/')[1] != 'essay'"></FixedTool>

    <RecordBottom></RecordBottom>
  </div>
</template>

<script setup>
const route = useRoute();
</script>

<style scoped>
.sticky-aside {
  @apply float-left flex-shrink-0 sticky max-h-[calc(100vh-60px)] overflow-y-scroll overscroll-y-contain top-[60px] pt-[15px] px-3 pb-[150px] hidden ml-5 flex-col lg:mx-3 lg:flex lg:w-[280px];
}
.sticky-aside::-webkit-scrollbar {
  display: none;
}
</style>
