<template>
  <UserNavHeader> </UserNavHeader>

  <BackgroundType> </BackgroundType>

  <div class="pt-5 transition-all duration-300 bg-white dark:bg-black flex">
    <aside class="sticky-aside">
      <UserNavAside class="mr-5"></UserNavAside>
    </aside>

    <main class="flex-1">
      <div class="mx-auto lg:ml-10 xl:ml-15 lg:w-[75%]">
        <slot />
        <RecordBottom></RecordBottom>
      </div>
    </main>
  </div>

  <UserNavBottom></UserNavBottom>

  <div class="fixed bottom-0 left-0 right-0 h-[60px] pointer-events-none">
    <Wave />
  </div>
</template>

<style scoped>
.sticky-aside {
  @apply sticky top-[70px] max-h-[100vh] pb-[150px] overflow-y-scroll hidden mt-5 ml-5 flex-col lg:ml-20 xl:ml-40 w-[240px] lg:flex lg:w-[300px] xl:w-[350px];
}
.sticky-aside::-webkit-scrollbar {
  display: none;
}
</style>
