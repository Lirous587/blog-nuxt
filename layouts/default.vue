<template>
  <UserNavHeader></UserNavHeader>

  <BackgroundType></BackgroundType>

  <el-container class="opacity-95 mt-[60px] bg-white flex h-[calc(100vh-60px)]">
    <el-aside
      class="hidden overscroll-contain ml-5 flex-col w-[160px] md:flex md:w-[240px] lg:my-10 lg:w-[300px] xl:w-[350px] lg:ml-10 xl:ml-20"
    >
      <el-scrollbar>
        <UserNavAside class="mr-5"></UserNavAside>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-main id="mainBox" class="overflow-x-hidden">
        <div class="md:ml-10 lg:ml-15 xl:ml-20 md:w-[85%] lg:w-[80%]">
          <slot />
          <RecordBottom></RecordBottom>
        </div>
      </el-main>
    </el-container>
  </el-container>

  <UserNavBottom></UserNavBottom>

  <div class="fixed bottom-0 left-0 right-0 h-[60px] pointer-events-none">
    <Wave />
  </div>
</template>

<style scoped>
.el-main {
  padding: 0;
}
</style>
