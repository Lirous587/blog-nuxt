<script setup lang="ts">
import NavAside from "~/components/admin/NavAside.vue";
</script>

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
    <div class="fixed bottom-0 left-0 right-0 h-[60px] pointer-events-none">
      <Wave />
    </div>
    <el-main>
      <div class="opacity-95 bg-white flex">
        <div
          class="hidden my-5 ml-5 flex-col w-[160px] md:flex md:w-[240px] lg:my-10 lg:w-[300px] xl:w-[350px] lg:ml-10 xl:ml-20"
        >
          <UserNavAside></UserNavAside>
        </div>
        <div class="my-5 mx-5 flex-1 md:flex-[0.9] md:mx-10">
          <slot />
        </div>
      </div>
    </el-main>
  </el-container>

  <div class="bg-white w-full opacity-95">
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

<style scoped>
.el-main {
  padding: 0;
}

.register {
  @apply flex flex-col justify-center items-center italic pb-5;
}
</style>
