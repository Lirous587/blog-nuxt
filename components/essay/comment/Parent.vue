<template>
  <div class="flex items-start">
    <!-- 左侧头像 -->
    <div class="p-2">
      <el-avatar :size="38" :src="avatarPre + data.avatar"></el-avatar>
    </div>
    <!-- 右侧信息 -->
    <div class="flex flex-col flex-1 dark:text-gray-500 p-1 gap-y-1">
      <span class="font-bold font-sans">
        {{ data.name }}
      </span>
      <span>
        {{ data.content }}
      </span>
      <div class="flex items-center gap-x-2 text-sm" v-if="data.id && hadLogin">
        <small class="text-gray-500">
          {{ formateDate(data.createTime) }}
        </small>
        <small
          class="text-green-700 hover:cursor-pointer hover:text-blue-300"
          @click="handleChoose"
        >
          {{ data.replayStatus ? "回复中" : "回复" }}
        </small>
        <el-popconfirm
          title="确认删除评论？"
          confirm-button-text="确认"
          cancel-button-text="取消"
          @confirm="handleDelete"
        >
          <template #reference>
            <small
              class="text-green-700 hover:cursor-pointer hover:text-blue-300"
            >
              {{ data.uid === userInfo.uid ? "删除" : "" }}
            </small>
          </template>
        </el-popconfirm>
      </div>

      <!-- replies -->
      <EssayCommentReplies
        :replyCount="data?.replyCount"
        :pid="data?.id"
        :choose="handleChoose"
      ></EssayCommentReplies>

      <!-- 评论框 ifComment用来标记文本 ifCommenting用来标记输入框状态  -->
      <!-- <div v-if="data.replayStatus || data.ifCommenting" class="flex flex-col">
        <el-form ref="formRef" :model="form" :rules="rules">
          <el-form-item prop="content">
            <el-input
              :placeholder="
                toUserName ? '正在回复' + '@' + toUserName : '请输入评论'
              "
              v-model="form.content"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 15 }"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="ml-auto mt-2">
          <el-button type="info" @click="submitCreate">回复</el-button>
        </div>
        <slider-validation
          ref="sliderValidationRef"
          @confirm="handleCreate"
        ></slider-validation>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import {
  createEssayCommentReply,
  deleteEssayCommentParent,
} from "~/api/comment";

const avatarPre = useRuntimeConfig().public.imgAvatarBase + "/";

const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
});
const sliderValidationRef = ref(null);

const userInfo = getUserInfoFromCookie();
const hadLogin = userIfLofin();

const form = reactive({
  toUserUid: "0",
  parentID: 0,
  content: "",
});
const formRef = ref(null);
const rules = reactive({
  content: [
    {
      required: true,
      message: "请输入评论内容",
      trigger: "blur",
    },
  ],
});

const emits = defineEmits("choose", "delete");
const toUserName = ref("");

const handleDelete = () => {
  deleteEssayCommentParent(props.data.id).then(() => {
    emits("delete", props.data.id);
    ElMessage.success("删除评论成功");
  });
};

// const clearReplyCommentStatus = () => {
//   list.value.forEach((reply) => {
//     reply.replayStatus = false;
//   });
// };

const handleChoose = () => {
  // clearReplyCommentStatus();
  emits("Choose");
  props.data.replayStatus = true;
  form.parentID = props.data.id;
  toUserName.value = "";
};

const submitCreate = async () => {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) sliderValidationRef.value.open();
  });
};

const handleCreate = () => {
  loading.value = true;
  createEssayCommentReply(form)
    .then(() => {
      ElMessage.success("评论成功");
      addTempData();
      form.content = "";
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
