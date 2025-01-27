<template>
  <el-card>
    <div class="flex flex-col">
      <el-divider direction="horizontal" content-position="center">
        <span class="ml-auto font-bold text-pink-600">评论区 </span>
      </el-divider>
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="content">
          <el-input
            placeholder="请输入评论内容"
            v-model="form.content"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 15 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        class="ml-auto mt-2 !rounded-md"
        :type="hadLogin ? 'primary' : 'warning'"
        @click="submitCreate"
        :loading="btnLoading"
      >
        {{ hadLogin ? "评论" : "请先登录" }}
      </el-button>
      <el-divider direction="horizontal" content-position="center">
        <span class="ml-auto font-bold text-blue-600"
          >{{ hadLogin ? "请友善评论" : "登录后才可以评论" }}
        </span>
      </el-divider>
      <slider-validation
        ref="sliderValidationRef"
        @confirm="handelCreate"
      ></slider-validation>
    </div>
  </el-card>
</template>

<script setup>
import { createEssayCommentParent } from "~/api/comment";

const props = defineProps({
  eid: {
    type: Number,
    require: true,
  },
});
const emits = defineEmits("comment");

const hadLogin = userIfLofin();

const btnLoading = ref(false);
const form = reactive({
  essayID: parseInt(props.eid),
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

const submitCreate = async () => {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) {
      sliderValidationRef.value.open();
    }
  });
};

const handelCreate = () => {
  btnLoading.value = true;
  createEssayCommentParent(form)
    .then((res) => {
      ElMessage.success("评论成功");
      emits("comment", form.content);
      form.content = "";
    })
    .finally(() => {
      btnLoading.value = false;
    });
};
</script>
