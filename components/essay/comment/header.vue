<template>
  <el-card shadow="hover">
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
    </div>
  </el-card>
  <slider-validation
    ref="sliderValidationRef"
    @confirm="handleCreate"
  ></slider-validation>
</template>

<script setup>
import { createEssayCommentParent } from "~/api/essay_comment";

const props = defineProps({
  eid: {
    type: Number,
    require: true,
  },
});
const emits = defineEmits(["comment"]);

const hadLogin = userIfLogin();
const userInfo = getUserInfoFromCookie();

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

const handleCreate = () => {
  btnLoading.value = true;
  createEssayCommentParent(form)
    .then((res) => {
      ElMessage.success("评论成功");
      const row = {
        id: res.data.id,
        user: {
          id: userInfo.id,
          avatar: userInfo.avatar,
          name: userInfo.name,
        },
        content: form.content,
        createTime: "刚刚",
      };
      emits("comment", row);
      form.content = "";
    })
    .finally(() => {
      btnLoading.value = false;
    });
};
</script>
