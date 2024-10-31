<template>
  <UserNavHeader> </UserNavHeader>

  <BackgroundType> </BackgroundType>

  <div class="mt-5 bg-white flex">
    <aside
      class="hidden mt-5 ml-5 flex-col md:ml-5 lg:ml-10 xl:ml-20 w-[240px] lg:flex md:w-[270px] lg:w-[300px] xl:w-[350px]"
    >
      <UserNavAside class="mr-5"></UserNavAside>
    </aside>

    <main class="flex-1 overflow-auto" id="mainBox">
      <div class="md:ml-5 lg:ml-10 xl:ml-15 md:w-[90%] lg:w-[85%] xl:w-[80%]">
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
