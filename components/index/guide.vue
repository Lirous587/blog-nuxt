<template>
  <el-card shadow="always" class="!rounded-xl cursor-pointer hover:!shadow-lg">
    <div class="flex items-center mb-2">
      <span class="w-1 h-[1em] inline-block mx-2 bg-blue-400"></span>
      <span class="text-blue-500">页面导航</span>
    </div>

    <div class="flex flex-wrap gap-2">
      <NuxtLink
        v-for="(item, index) in list"
        :to="item.url"
        class="py-2 px-2 rounded-lg border border-yellow-600 animate-pulse text-slate-600 dark:text-neutral-200 transition-transform duration-300 hover:scale-110 hover:text-blue-200"
        :style="{ animationDelay: `${index * -0.5}s` }"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
  </el-card>
</template>

<script setup>
const list = ref([
  {
    title: "时间轴",
    url: "/timeEvent/1",
  },
  {
    title: "心语",
    url: "/heartWord/1",
  },
  {
    title: "友链",
    url: "/friendLink",
  },
]);
</script>
