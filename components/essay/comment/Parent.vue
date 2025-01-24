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
          {{ data.ifComment ? "回复中" : "回复" }}
        </small>

        <el-popconfirm
          title="确认删除评论？"
          confirm-button-text="确认"
          cancel-button-text="取消"
          @confirm="handelDelete"
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

      <small
        @click="getMoreComment"
        class="text-xs text-gray-500 hover:cursor-pointer hover:text-blue-300 mt-1"
        v-if="data.replyCount > 0 && !havaExpand"
        v-loading="loading"
      >
        共{{ data.replyCount }}条评论点击查看
      </small>

      <!-- replies -->
      <div v-if="havaExpand || list.length > 0" v-loading="loading">
        <EssayCommentReply
          @Choose="handelReplyChoose"
          @Delete="handelReplyDelete"
          :list="list"
        ></EssayCommentReply>
        <el-pagination
          :hide-on-single-page="true"
          layout="prev, pager, next"
          :page-count="pageCount"
          @change="changePage"
        />
      </div>

      <!-- 评论框 ifComment用来标记文本 ifCommenting用来标记输入框状态  -->
      <div v-if="data.ifComment || data.ifCommenting" class="flex flex-col">
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
          @confirm="handelCreate"
        ></slider-validation>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  createEssayCommentReply,
  deleteEssayCommentParent,
  getEssayCommentReplies,
} from "~/api/comment";

const avatarPre = useRuntimeConfig().public.imgAvatarBase + "/";

const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
});

const userInfo = getUserInfoFromCookie();
const hadLogin = userIfLofin();

// 回复
const eid = parseInt(inject("eid"));

const emits = defineEmits("Choose", "Delete");
const toUserName = ref("");
const form = reactive({
  toUserUid: "0",
  parentID: 0,
  essayID: eid,
  content: "",
});
const formRef = ref(null);
const sliderValidationRef = ref(null);
const rules = reactive({
  content: [
    {
      required: true,
      message: "请输入评论内容",
      trigger: "blur",
    },
  ],
});

const handleChoose = () => {
  clearReplyCommentStatus();
  emits("Choose");
  props.data.ifComment = true;
  form.parentID = props.data.id;
  toUserName.value = "";
};

const submitCreate = async () => {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) {
      sliderValidationRef.value.open();
    }
  });
};

const handelCreate = () => {
  loading.value = true;
  createEssayCommentReply(form)
    .then((res) => {
      ElMessage.success("评论成功");
      addTempData();
      form.content = "";
    })
    .finally(() => {
      loading.value = false;
    });
};

// replies
const query = reactive({
  pid: props.data.id,
  page: 1,
  pageSize: 5,
});
const list = ref([]);
const pageCount = parseInt(
  (props.data.replyCount + query.pageSize - 1) / query.pageSize
);
const havaExpand = ref(false);
const loading = ref(false);

const getList = async () => {
  loading.value = true;
  await getEssayCommentReplies(query)
    .then((res) => {
      const data = res.data;
      havaExpand.value = true;
      list.value = data;
    })
    .finally(() => {
      loading.value = false;
    });
};

const getMoreComment = () => {
  getList();
};

const changePage = async (page) => {
  query.page = page;
  getList();
};

const handelReplyChoose = (item) => {
  for (const key in item) {
    form[key] = item[key];
  }
  clearReplyCommentStatus();
  emits("Choose");
  props.data.ifCommenting = true;
  toUserName.value = item.toUserName;
};

const clearReplyCommentStatus = () => {
  list.value.forEach((reply) => {
    reply.ifComment = false;
  });
};

const addTempData = () => {
  if (toUserName.value === "") toUserName.value = userInfo.name;
  let row = {
    fromUser: {
      avatar: userInfo.avatar,
      name: userInfo.name,
    },
    toUser: {
      name: toUserName,
    },
    createTime: "刚刚",
    content: form.content,
  };
  list.value.unshift(row);
  props.data.replyCount += 1;
};

// delete
const deleteForm = reactive({
  commentID: props.data.id,
});

const handelDelete = () => {
  deleteEssayCommentParent(deleteForm).then((res) => {
    emits("Delete", props.data.id);
    ElMessage.success("删除评论成功");
  });
};

const handelReplyDelete = (rid) => {
  loading.value = true;
  setTimeout(() => {
    list.value = list.value.filter((item) => item.id !== rid);
    props.data.replyCount -= 1;
    loading.value = false;
  }, 300);
};
defineExpose({
  clearReplyCommentStatus,
});
</script>
