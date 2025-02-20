<template>
  <el-card shadow="hover">
    <div class="flex items-center mb-2">
      <span class="w-1 h-[1em] inline-block mx-2 bg-blue-400"></span>
      <span class="text-blue-500">分类专栏</span>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div v-for="(item, index) in list">
        <NuxtLink
          :key="item.id"
          :to="'/kind/' + item.id + '/1'"
          class="relative flex flex-col items-center rounded-md py-4 border dark:border-gray-500 transition-transform animate-pulse duration-300 hover:scale-110"
          :style="{ animationDelay: `${index * 0.6}s` }"
        >
          <el-icon>
            <component class="text-pink-500" :is="item.icon"></component>
          </el-icon>
          <span class="text-green-500">
            {{ item.name }}
          </span>
          <span
            class="absolute top-0 right-0 translate-x-[-100%] text-sm text-gray-700 dark:text-neutral-200"
          >
            {{ item.essayCount }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </el-card>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>
