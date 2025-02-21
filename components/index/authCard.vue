<template>
  <div class="flex flex-col items-center justify-around gap-y-3">
    <div class="text-xs p-2 rounded-lg text-yellow-500">
      表独立兮山之上,云容容兮而在下
    </div>

    <div
      class="auth-card my-5 h-[80px] w-full relative flex items-center justify-center"
    >
      <div
        class="absolute opacity-0 transition-all duration-500 text-sm text-gray-400 flex flex-col items-center"
      >
        <div>
          一名<span class="font-bold text-black dark:text-white/80"
            >全栈·学习者</span
          >
        </div>
        <span class="font-bold text-black dark:text-white/80"> 记录生活</span>
        <span class="font-bold text-black dark:text-white/80">学习技术</span>
        <div>本站对你有帮助</div>
      </div>
      <el-avatar
        :size="78"
        src="/avator.jpg"
        class="transition-all duration-500"
      />
    </div>

    <div class="flex items-center justify-between w-full">
      <div class="ml-5">
        <h2 class="text-lg text-balck dark:text-gray-600">Lirous</h2>
        <h3 class="text-xs text-balck dark:text-gray-600">cv调库虾</h3>
      </div>

      <div class="flex gap-x-2">
        <NuxtLink target="_blank" :to="githubUrl" class="p-1">
          <MyIconGithub
            class="text-black dark:text-yellow-600 hover:scale-110 transition-transform duration-500"
          >
          </MyIconGithub>
        </NuxtLink>
        <NuxtLink target="_blank" :to="bilibiliUrl" class="p-1">
          <MyIconBilibili
            class="text-black dark:text-yellow-600 hover:scale-110 transition-transform duration-500"
          >
          </MyIconBilibili>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { githubUrl, bilibiliUrl } from "~/info.js";
</script>

<style scoped>
.auth-card:hover > :nth-child(1) {
  opacity: 100;
}

.auth-card:hover > :nth-child(2) {
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
