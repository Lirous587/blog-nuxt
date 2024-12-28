<template>
  <div class="flex items-start">
    <div class="p-2">
      <el-avatar :size="38" :src="avatarPre + data.avatar"></el-avatar>
    </div>
    <div class="flex flex-col flex-1 dark:text-gray-500 p-1 gap-y-1">
      <span class="font-bold font-sans">
        {{ data.name }}
      </span>
      <span>
        {{ data.content }}
      </span>
      <small class="text-gray-500">
        {{ formateDate(data.createTime) }}
      </small>
      <!-- <el-divider></el-divider> -->
      <div>
        <button class="mb-2" @click="handelCommentPre(data)">
          <div class="flex items-center justify-start">
            <small class="inline-block text-xs my-auto mr-1 text-pink-500">
              {{ data.ifComment ? "回复中" : "回复" }}</small
            >
            <el-icon size="18"><ChatRound /></el-icon>
          </div>
        </button>
        <div v-if="data.ifComment">
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

const emits = defineEmits("Choose");

const form = reactive({
  parentID: 0,
  essayID: eid,
  content: "",
});

const handelCommentPre = (item) => {
  form.parentID = item.id;
  emits("Choose");
  item.ifComment = true;
};

const handelCreate = () => {
  createEssayCommentReply(form).then((res) => {
    ElMessage.success("评论成功");
  });
};
</script>
