<template>
  <el-card shadow="always" class="!rounded-xl cursor-pointer hover:!shadow-lg">
    <div class="flex items-center mb-2">
      <span class="w-1 h-[1em] inline-block mx-2 bg-blue-400"></span>
      <span>分类专栏</span>
    </div>
    <div class="flex flex-col gap-2">
      <div v-for="item in list">
        <NuxtLink
          :key="item.id"
          :to="'/kind' + item.router"
          class="flex items-center justify-between"
        >
          <div class="flex items-center gap-2 ml-2">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.name }}
          </div>
          <div class="mr-3">{{ item.count }}篇</div>
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
