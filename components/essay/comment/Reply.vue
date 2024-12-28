<template>
  <div class="flex items-start">
    <div class="p-2">
      <el-avatar :size="30" :src="avatarPre + data.fromUser.avatar"></el-avatar>
    </div>
    <div class="flex flex-col flex-1 dark:text-gray-500 gap-y-1 p-1">
      <div class="flex">
        <small>
          {{ data.fromUser.name }}
        </small>
        <div class="flex items-center mx-1">
          <div
            class="border-y-[4px] border-y-transparent border-l-[8px] border-l-pink-600"
          ></div>
        </div>
        <small>
          {{ data.toUser.name }}
        </small>
      </div>
      <span class="text-sm">
        {{ data.content }}
      </span>
      <small class="text-gray-500"> {{ formateDate(data.createTime) }}</small>
      <button class="mb-2" @click="handelCommentPre(data)">
        <div class="flex items-center justify-start">
          <small class="inline-block text-xs my-auto mr-1 text-pink-500">
            {{ data?.ifComment ? "回复中" : "回复" }}</small
          >
          <el-icon size="18"><ChatRound /></el-icon>
        </div>
      </button>
      <div v-if="data?.ifComment">
        <el-input
          placeholder="请输入评论内容"
          v-model="form.content"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 15 }"
        ></el-input>
        <el-button
          class="!block !ml-auto mt-2"
          type="info"
          @click="handelCreate"
          size="small"
        >
          回复</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { createEssayCommentReply } from "~/api/comment";

const avatarPre = useRuntimeConfig().public.imgAvatarBase + "/";

const props = defineProps({
  data: {
    required: true,
    type: Object,
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
