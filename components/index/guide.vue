<template>
  <div>
    <slot></slot>

    <div class="flex flex-wrap gap-2 p-1.5">
      <NuxtLink
        v-for="item in list"
        :to="item.url"
        class="py-2 px-2 rounded-md text-slate-600 dark:text-neutral-200 transition-transform duration-500 hover:scale-105 hover:bg-violet-100 dark:hover:bg-gray-800"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const list = ref([
  {
    title: "时间轴",
    url: "/timeEvent",
  },
  {
    title: "归档",
    url: "/essay/timelines",
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
