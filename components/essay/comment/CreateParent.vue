<template>
  <el-card v-loading="loading">
    <div class="flex flex-col">
      <el-divider direction="horizontal" content-position="center">
        <span class="ml-auto font-bold text-pink-600">评论区 </span>
      </el-divider>
      <el-input
        placeholder="请输入评论内容"
        v-model="form.content"
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 15 }"
      ></el-input>
      <el-button
        class="ml-auto mt-2 !rounded-md"
        :type="hadLogin ? 'primary' : 'warning'"
        @click="handelCreate"
      >
        {{ hadLogin ? "评论" : "请先登录" }}
      </el-button>
      <el-divider direction="horizontal" content-position="center">
        <span class="ml-auto font-bold text-blue-600"
          >{{
            hadLogin
              ? "请友善评论"
              : "登录之后才可以进行评论操作,现在只允许浏览评论"
          }}
        </span>
      </el-divider>
    </div>
  </el-card>
</template>

<script setup>
import { createEssayCommentParent } from "~/api/comment";

const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
});

const hadLogin = userIfLofin();

const eid = parseInt(inject("eid"));
const loading = ref(false);
const form = reactive({
  essayID: eid,
  content: "",
});

const emits = defineEmits("comment");

const handelCreate = () => {
  loading.value = true;
  createEssayCommentParent(form)
    .then((res) => {
      ElMessage.success("评论成功");
      emits("comment", form.content);
      form.content = "";
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
