<template>
  <MyCard shadow="always" class="!rounded-xl cursor-pointer hover:!shadow-lg">
    <div class="flex items-center mb-2">
      <span class="w-1 h-[1em] inline-block mx-2 bg-blue-400"></span>
      <span class="text-blue-500">标签</span>
    </div>
    <div class="flex flex-wrap gap-2">
      <NuxtLink
        v-for="(item, index) in list"
        :key="item.id"
        :to="'/label/' + item.id + '/1'"
        class="relative py-2 px-3 rounded-lg border border-blue-500 dark:border-pink-400 animate-pulse text-slate-600 dark:text-neutral-200 transition-transform duration-300 hover:scale-110"
        :style="{
          animationDelay: `${index * 0.2}s`,
        }"
      >
        {{ item.name }}
        <span
          class="absolute top-0 right-0 translate-x-[-50%] text-xs text-gray-700 dark:text-neutral-200"
        >
          {{ item.essayCount }}
        </span>
      </NuxtLink>
    </div>
  </MyCard>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>
