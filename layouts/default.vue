<template>
  <el-backtop
    class="hidden-sm-and-up"
    :right="40"
    :bottom="30"
    :visibility-height="300"
  />
  <el-container>
    <el-header class="!p-0">
      <UserNavHeader></UserNavHeader>
    </el-header>
    <el-row :gutter="0">
      <el-main class="mt-[60px]">
        <slot />
      </el-main>
    </el-row>
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
