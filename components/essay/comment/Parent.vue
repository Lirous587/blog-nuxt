<template>
  <div class="flex items-start">
    <div class="p-2">
      <el-avatar :size="38" :src="avatarPre + data.avatar"></el-avatar>
    </div>
    <div class="flex-col flex-1 dark:text-gray-500">
      <span class="font-bold font-sans">
        {{ data.name }}
      </span>
      <div>
        {{ data.content }}
      </div>
      <small class="text-gray-500">
        {{ formateDate(data.createTime) }}
      </small>
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
