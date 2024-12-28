<template>
  <el-card>
    <el-input
      placeholder="请输入评论内容"
      v-model="form.content"
      type="textarea"
      :autosize="{ minRows: 6, maxRows: 15 }"
    ></el-input>
    <el-button
      class="!block !ml-auto mt-2 !rounded-lg"
      type="primary"
      @click="handelCreate"
    >
      评论
    </el-button>
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

const emits = defineEmits("Choose");

const form = reactive({
  essayID: eid,
  content: "",
});

const handelCreate = () => {
  createEssayCommentParent(form).then((res) => {
    ElMessage.success("评论成功");
  });
};
</script>
