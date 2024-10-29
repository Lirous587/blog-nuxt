<template>
  <el-card shadow="always" class="!rounded-xl hover:!shadow-xl">
    <div class="flex flex-col items-center justify-around gap-y-3">
      <el-avatar
        src="/avator.jpg"
        :size="80"
        class="cursor-pointer hover:rotate-180 hover:scale-110 transition-transform duration-300 ease-in-out"
      ></el-avatar>
      <h2 class="text-2xl text-green-500">Lirous</h2>
      <div class="flex items-center justify-around gap-5">
        <div
          v-for="item in authorData"
          class="flex flex-col items-center text-lg text-blue-400"
        >
          <h2>{{ item.name }}</h2>
          <h2>{{ item.count }}</h2>
        </div>
      </div>
      <NuxtLink
        target="_blank"
        to="https://github.com/Lirous587"
        class="bg-green-400 py-1 px-5 rounded-2xl flex items-center gap-x-1"
      >
        <el-icon color="red" size="16"><Star /></el-icon>
        <span class="text-cyan-50">关于作者 </span>
      </NuxtLink>
    </div>
  </el-card>
</template>

<script setup>
const props = defineProps({
  authorData: {
    type: Object,
    default: {
      essayCount: 0,
      labelCount: 0,
      kindCount: 0,
    },
  },
});
</script>
