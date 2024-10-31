<template>
  <UserNavHeader> </UserNavHeader>

  <BackgroundType> </BackgroundType>

  <div class="mt-5 bg-white flex">
    <aside
      class="hidden mt-5 ml-5 flex-col lg:ml-20 xl:ml-40 w-[240px] lg:flex lg:w-[300px] xl:w-[350px]"
    >
      <UserNavAside class="mr-5"></UserNavAside>
    </aside>

    <main class="flex-1 overflow-auto" id="mainBox">
      <div class="mx-auto w-full lg:ml-10 xl:ml-15 lg:w-[75%]">
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
