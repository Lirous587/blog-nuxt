<template>
  <div class="bg-[rgb(242,243,245)] dark:bg-black">
    <DefaultNavHeader></DefaultNavHeader>

    <!-- <DefaultBackground>
      <DefaultTypeHeartWord />
    </DefaultBackground> -->
    <div
      class="flex mx-[10px] md:mx-[110px] lg:mx-[140px] pt-[80px] transition-all duration-300"
    >
      <aside
        class="float-left flex-shrink-0 overflow-y-scroll overscroll-y-contain top-[60px] px-3 pb-[150px] hidden ml-5 flex-col lg:mx-3 lg:flex lg:w-[300px]"
      >
        <DefaultNavAside></DefaultNavAside>
      </aside>
      <!-- 此处加一个w-0 通知子元素可以在父元素发生溢出 -->
      <main class="w-0 flex-1 p-5 rounded-md bg-white dark:bg-[rgb(29,30,34)]">
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
.sticky-aside::-webkit-scrollbar {
  display: none;
}
</style>
