<template>
  <div class="flex items-start" v-for="item in list">
    <div class="p-2">
      <el-avatar :size="30" :src="avatarPre + item.fromUser.avatar"></el-avatar>
    </div>
    <div class="flex flex-col flex-1 dark:text-gray-500 gap-y-1 p-1">
      <div class="flex">
        <small>
          {{ item.fromUser.name }}
        </small>
        <div class="flex items-center mx-1">
          <div
            class="border-y-[4px] border-y-transparent border-l-[8px] border-l-pink-600"
          ></div>
        </div>
        <small>
          {{ item.toUser.name }}
        </small>
      </div>
      <span class="text-sm">
        {{ item.content }}
      </span>
      <small class="text-gray-500"> {{ formateDate(item.createTime) }}</small>
      <button class="mb-2" @click="handelCommentPre(item)">
        <div class="flex items-center justify-start">
          <small class="inline-block text-xs my-auto mr-1 text-pink-500">
            {{ item?.ifComment ? "回复中" : "回复" }}</small
          >
          <el-icon size="18"><ChatRound /></el-icon>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { createEssayCommentReply } from "~/api/comment";

const avatarPre = useRuntimeConfig().public.imgAvatarBase + "/";

const props = defineProps({
  list: {
    required: true,
    type: Array,
  },
});
const eid = parseInt(inject("eid"));

const form = reactive({
  toUserUid: 0,
  parentID: 0,
  essayID: eid,
  content: "",
});

const emits = defineEmits("Choose");

const handelCommentPre = (item) => {
  form.parentID = item.parentID;
  form.toUserUid = item.toUser.uid;
  emits("Choose");
  item.ifComment = true;
};

const handelCreate = () => {
  createEssayCommentReply(form).then((res) => {
    ElMessage.success("评论成功");
  });
};
</script>
