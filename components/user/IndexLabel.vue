<template>
  <el-card shadow="always" class="!rounded-xl cursor-pointer hover:!shadow-lg">
    <div class="flex items-center mb-2">
      <span class="w-1 h-[1em] inline-block mx-2 bg-blue-400"></span>
      <span class="text-blue-500">标签</span>
    </div>
    <div class="flex flex-wrap gap-2">
      <NuxtLink
        v-for="item in list"
        :key="item.id"
        :to="'/label/' + item.id + '/1'"
        class="py-2 px-2 rounded-lg text-white"
        :style="{ backgroundColor: item.color }"
      >
        {{ item.name }}
      </NuxtLink>
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
