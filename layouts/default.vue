<template>
  <UserNavHeader> </UserNavHeader>

  <BackgroundType> </BackgroundType>

  <div class="pt-10 transition-all duration-300 bg-white dark:bg-black flex">
    <main class="flex-1 mx-3 lg:ml-20">
      <slot />
    </main>
    <aside class="sticky-aside">
      <UserNavAside></UserNavAside>
    </aside>
  </div>

  <UserNavBottom></UserNavBottom>
  <div class="fixed bottom-0 left-0 right-0 h-[60px] pointer-events-none">
    <Wave />
  </div>

  <FixedTool></FixedTool>

  <RecordBottom></RecordBottom>
</template>

<style scoped>
.sticky-aside {
  @apply sticky overscroll-y-contain top-[70px] max-h-[100vh] pb-[150px] overflow-y-scroll hidden ml-5 flex-col lg:mr-20 lg:flex lg:w-[280px];
}
.sticky-aside::-webkit-scrollbar {
  display: none;
}
</style>
