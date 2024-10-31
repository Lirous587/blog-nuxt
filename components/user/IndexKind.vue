<template>
  <el-card shadow="always" class="!rounded-xl cursor-pointer hover:!shadow-lg">
    <div class="flex items-center mb-2">
      <span class="w-1 h-[1em] inline-block mx-2 bg-blue-400"></span>
      <span class="text-blue-500">分类专栏</span>
    </div>
    <div class="flex flex-col gap-2">
      <div v-for="item in list">
        <NuxtLink
          :key="item.id"
          :to="'/kind/' + item.id + '/1'"
          class="flex items-center justify-between transition-transform hover:animate-pulse"
        >
          <div class="flex items-center gap-2 ml-2 flex-shrink-0">
            <el-icon>
              <component class="text-pink-500" :is="item.icon"></component>
            </el-icon>
            <span class="text-green-500">
              {{ item.name }}
            </span>
          </div>
          <div class="mr-3 flex-shrink-0 text-red-500">
            {{ item.essayCount }}篇
          </div>
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
