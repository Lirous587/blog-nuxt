<template>
  <div class="flex items-start">
    <div class="p-2">
      <el-avatar :size="30" :src="avatarPre + data.fromUser.avatar"></el-avatar>
    </div>
    <div class="flex-col flex-1 dark:text-gray-500">
      <small>
        {{ data.fromUser.name }}
        ->
        {{ data.toUser.name }}
      </small>
      <div>
        {{ data.content }}
      </div>
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
