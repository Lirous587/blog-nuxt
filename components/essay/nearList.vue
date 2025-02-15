<template>
  <div class="flex items-center mb-2">
    <span class="w- h-[1em] inline-block mx-2 bg-red-700"></span>
    <span class="text-blue-500 font-bold">近期文章</span>
  </div>
  <div
    v-for="item in list"
    class="p-4 border-t border-gray-200 dark:border-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-900 transition-colors duration-300"
  >
    <NuxtLink :key="item.id" :to="'/essay/' + item.id">
      <div class="flex flex-col gap-y-2">
        <div class="font-bold text-lg text-blue-400 dark:text-blue-700">
          {{ item.name }}
        </div>
        <small class="line-clamp-3 text-blue-300 dark:text-gray-500">
          {{ item.introduction }}
        </small>
        <small class="text-gray-300 dark:text-gray-700">
          {{ formateDate(item.createdTime) }}
        </small>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>
