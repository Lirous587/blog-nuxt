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
    <div class="fixed bottom-0 left-0 right-0 h-[60px]">
      <UserWave></UserWave>
    </div>
    <el-main class="mt-[100vh]">
      <slot />
    </el-main>
  </el-container>

  <div style="width: 100%">
    <footer class="register">
      <a class="text-xs" target="_blank" href="https://github.com/Lijingwoquan"
        >© 2024 罹景偓佺的博客 By 罹景.本站博客未经授权禁止转载.
      </a>
      <a
        class="text-xs"
        target="_blank"
        href="https://beian.miit.gov.cn/#/Integrated/index"
        >备案信息:湘ICP备2024043210号.</a
      >
    </footer>
  </div>
</template>

<script setup></script>

<style scoped>
.el-main {
  padding: 0;
}

.register {
  @apply flex flex-col justify-center items-center italic mt-10 mb-5;
}
</style>
