<template>
  <el-backtop
    class="hidden-sm-and-up"
    :right="40"
    :bottom="30"
    :visibility-height="300"
  />

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
      <el-main>
        <el-scrollbar>
          <div class="mx-10 md:mx-15 lg:mx-20 xl:mx-30 md:w-[80%]">
            <slot />
            <RecordBottom></RecordBottom>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>

  <div class="fixed bottom-0 left-0 right-0 h-[60px] pointer-events-none">
    <Wave />
  </div>
</template>

<style scoped>
.el-main {
  padding: 0;
}
</style>
