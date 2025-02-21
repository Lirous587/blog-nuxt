<template>
  <div class="bg-[rgb(255,255,255)] dark:bg-black">
    <DefaultNavHeader></DefaultNavHeader>

    <DefaultBackground>
      <DefaultTypeHeartWord />
    </DefaultBackground>

    <div class="flex pt-10 transition-all duration-300">
      <aside class="sticky-aside">
        <DefaultNavAside></DefaultNavAside>
      </aside>
      <!-- 此处加一个w-0 通知子元素可以在父元素发生溢出 -->
      <main class="w-0 flex-1 mx-1 md:mx-2 lg:mx-4">
        <slot />
      </main>
    </div>

    <div
      class="fixed z-50 bottom-0 left-0 right-0 h-[60px] pointer-events-none"
    >
      <Wave />
    </div>

    <FixedTool v-if="route.path.split('/')[1] != 'essay'"></FixedTool>
    <DefaultRecordBottom></DefaultRecordBottom>
  </div>
</template>

<script setup>
const route = useRoute();
</script>

<style scoped>
@reference "assets/css/tailwind.css";

.sticky-aside {
  @apply float-left flex-shrink-0  overflow-y-scroll overscroll-y-contain top-[60px] pt-[15px] px-3 pb-[150px] hidden ml-5 flex-col lg:mx-3 lg:flex lg:w-[300px];
}
.sticky-aside::-webkit-scrollbar {
  display: none;
}

</style>
