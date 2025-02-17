<template>
  <el-card shadow="always" class="!rounded-xl hover:!shadow-xl">
    <div class="flex flex-col items-center justify-around gap-y-3">
      <NuxtLink target="_blank" to="https://github.com/Lirous587">
        <el-avatar
          src="/avator.jpg"
          :size="80"
          class="cursor-pointer hover:animate-pulse hover:scale-110 transition-transform duration-300 ease-in-out"
        ></el-avatar>
      </NuxtLink>

      <h2 class="text-2xl text-green-500">Lirous</h2>
      <div class="flex items-center justify-around gap-5">
        <div
          v-for="item in data"
          class="flex flex-col items-center text-lg text-blue-400"
        >
          <h2>{{ item.name }}</h2>
          <h2>{{ item.count }}</h2>
        </div>
      </div>
      <NuxtLink
        target="_blank"
        to="https://github.com/Lirous587"
        class="bg-green-400 dark:bg-pink-400 py-1 px-5 rounded-2xl flex items-center gap-x-1 transition-all duration-300 hover:bg-yellow-500"
      >
        <el-icon size="16" class="!text-gray-500 dark:!text-blue-300"
          ><Star
        /></el-icon>
        <span class="text-gray-500 dark:text-blue-200">关于作者 </span>
      </NuxtLink>
    </div>
  </el-card>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {
      essayCount: 0,
      labelCount: 0,
      kindCount: 0,
    },
  },
});
</script>
