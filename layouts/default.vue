<template>
  <el-backtop
    class="hidden-sm-and-up"
    :right="40"
    :bottom="30"
    :visibility-height="300"
  />

  <el-container>
    <el-header class="!p-0 w-full">
      <UserNavHeader></UserNavHeader>
      <UserHomeDecoration></UserHomeDecoration>
    </el-header>
  </el-container>

  <el-container class="opacity-95 bg-white flex h-[calc(100vh-60px)]">
    <el-aside
      class="hidden overscroll-contain my-5 ml-5 flex-col w-[160px] md:flex md:w-[240px] lg:my-10 lg:w-[300px] xl:w-[350px] lg:ml-10 xl:ml-20"
    >
      <el-scrollbar>
        <UserNavAside class="mr-5"></UserNavAside>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-main>
        <el-scrollbar>
          <div class="my-5 mx-10 md:mx-15 lg:mx-20 xl:mx-30">
            <slot />
          </div>
        </el-scrollbar>
      </el-main>

      <el-footer class="register">
        <a
          class="text-xs"
          target="_blank"
          href="https://github.com/Lijingwoquan"
          >© 2024 罹景偓佺的博客 By 罹景.本站博客未经授权禁止转载.
        </a>
        <a
          class="text-xs"
          target="_blank"
          href="https://beian.miit.gov.cn/#/Integrated/index"
          >备案信息:湘ICP备2024043210号.</a
        >
      </el-footer>
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

.register {
  @apply flex flex-col justify-center items-center italic pb-5;
}
</style>
