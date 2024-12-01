<template>
  <div>
    <UserNavHeader> </UserNavHeader>

    <BackgroundType> </BackgroundType>

    <div class="pt-10 transition-all duration-300 bg-white dark:bg-black flex">
      <aside class="sticky-aside">
        <UserNavAside></UserNavAside>
      </aside>
      <main class="flex-1 mx-3">
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
  @apply flex-shrink-0 sticky overflow-y-scroll overscroll-y-contain max-h-[calc(100vh-60px)] top-[60px] pt-[15px] px-3 pb-[150px] hidden ml-5 flex-col md:mx-3 md:flex md:w-[280px];
}
.sticky-aside::-webkit-scrollbar {
  display: none;
}
</style>
