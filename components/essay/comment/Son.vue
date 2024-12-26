<template>
  <div class="flex items-start">
    <div class="p-2">
      <el-avatar :size="30" :src="avatarPre + data.avatar"> </el-avatar>
    </div>
    <div class="flex flex-col items-start justify-center dark:text-gray-500">
      <small class="font-sans">{{ data.name }}</small>
      <span> {{ data.content }}</span>
      <small class="text-gray-500"> {{ formateDate(data.createTime) }}</small>
    </div>
  </div>
</template>

<script setup>
const avatarPre = useRuntimeConfig().public.imgAvatarBase + "/";

const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
});
</script>

<style></style>
