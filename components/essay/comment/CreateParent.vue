<template>
  <el-card v-loading="loading">
    <div class="flex flex-col">
      <el-input
        placeholder="请输入评论内容"
        v-model="form.content"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 15 }"
      ></el-input>
      <el-button
        class="ml-auto mt-2 !rounded-md"
        type="primary"
        @click="handelCreate"
      >
        评论
      </el-button>
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
