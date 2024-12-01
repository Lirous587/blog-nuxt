<template>
  <UserNavHeader> </UserNavHeader>

  <BackgroundType> </BackgroundType>

  <div class="pt-10 transition-all duration-300 bg-white dark:bg-black flex">
    <aside class="sticky-aside">
      <UserNavAside></UserNavAside>
    </aside>
    <main class="flex-1 mx-3 lg:mr-20">
      <slot />
    </main>
  </div>

  <div class="fixed bottom-0 left-0 right-0 h-[60px] pointer-events-none">
    <Wave />
  </div>

  <FixedTool></FixedTool>

  <RecordBottom></RecordBottom>
</template>

<style scoped>
.sticky-aside {
  @apply top-[70px] pb-[150px] overflow-y-scroll hidden ml-5 flex-col lg:ml-5 lg:mr-5 lg:flex lg:w-[280px];
}
.sticky-aside::-webkit-scrollbar {
  display: none;
}
</style>
