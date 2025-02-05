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
      <div class="flex items-center gap-x-2 text-sm" v-if="hadLogin || ifAdmin">
        <small class="text-gray-500">
          {{
            data.createTime === "刚刚" ? "刚刚" : formateDate(data.createTime)
          }}
        </small>
        <small
          class="text-green-700 hover:cursor-pointer hover:text-blue-300"
          @click="handleChoose"
          v-if="!ifAdmin"
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
              {{ data.uid === userInfo?.uid || ifAdmin ? "删除" : "" }}
            </small>
          </template>
        </el-popconfirm>
      </div>

      <!-- replies -->
      <EssayCommentReplies
        :pid="data?.id"
        @choose="handleRepliesChoose"
        ref="repliesRef"
      ></EssayCommentReplies>

      <!-- replyStatus是否是回复中 commentStatus用来标记评论框状态  -->
      <div v-if="data.replayStatus || data.commentStatus" class="flex flex-col">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  createEssayCommentReply,
  deleteEssayCommentParent,
} from "~/api/essay_comment";

const avatarPre = useRuntimeConfig().public.imgAvatarBase + "/";

const ifAdmin = inject("admin", false);

const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
  eid: {
    require: true,
    type: Number,
  },
});

const repliesRef = ref(null);
const sliderValidationRef = ref(null);

const userInfo = getUserInfoFromCookie();
const hadLogin = userIfLogin();

const form = reactive({
  toUserUid: "0",
  parentID: 0,
  content: "",
  // 这里是非必须的 写下来方便后续unshift加
  toUserName: "",
  parentID: 0,
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

const emits = defineEmits(["choose", "delete", "repliesChoose"]);
const toUserName = ref("");

const handleDelete = () => {
  deleteEssayCommentParent(props.eid, props.data.id).then(() => {
    emits("delete", props.data.id);
    ElMessage.success("删除评论成功");
  });
};

const handleChoose = () => {
  emits("choose", props.data.id);
  form.parentID = props.data.id;
  toUserName.value = props.data.name;
};

const handleRepliesChoose = (emitData) => {
  for (const key in emitData) {
    form[key] = emitData[key];
  }
  toUserName.value = emitData.toUserName;
  emits("repliesChoose", emitData);
};

const clearRepliesChooseStatus = () => {
  repliesRef.value.clearRepliesChooseStatus();
};

const submitCreate = async () => {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) sliderValidationRef.value.open();
  });
};

const handleCreate = () => {
  createEssayCommentReply(form).then((res) => {
    ElMessage.success("评论成功");

    const row = {
      fromUser: {
        name: userInfo.name,
        avatar: userInfo.avatar,
        uid: userInfo.uid,
      },
      toUser: {
        name: form.toUserName,
        avatar: "",
      },
      content: form.content,
      createTime: "刚刚",
      parentID: form.parentID,
      id: res.data.id,
    };
    repliesRef.value.unshitOneReply(row);

    form.content = "";
  });
};

defineExpose({
  clearRepliesChooseStatus,
});
</script>
