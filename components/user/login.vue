<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-xl font-bold my-3 text-yellow-500 dark:text-gray-400">
      登 录
    </h1>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      class="pr-5 w-full"
      label-width="50px"
    >
      <el-form-item label="邮箱" prop="email" for="email">
        <el-input v-model="form.email" name="email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" for="password">
        <el-input
          v-model="form.password"
          type="password"
          show-password
          name="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="w-full mx-auto !rounded-3xl"
          size="large"
          type="success"
          @click="sumbitLogin"
          :loading="btnLoading"
          >登录
        </el-button>
      </el-form-item>
    </el-form>
    <SliderValidation
      ref="slideValidationRef"
      @confirm="handelSlideConfirm"
    ></SliderValidation>
  </div>
</template>

<script setup>
import { login } from "~/api/user";
const form = reactive({
  email: "",
  password: "",
});

const router = useRouter();

const slideValidationRef = ref(null);

const btnLoading = ref(false);

const formRef = ref(null);

const rules = reactive({
  email: [
    {
      required: true,
      message: "请输入邮箱地址",
      trigger: "blur",
      type: "email",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});

const handelSlideConfirm = () => {
  handelLogin();
};

const handelLogin = () => {
  btnLoading.value = true;
  login(form)
    .then((res) => {
      toast("登录成功");
      setUserAccessToken(res.data.token);
      setUserRefreshToken(res.data.refreshToken);
      router.push("/");
    })
    .catch((err) => {
      ElMessage.error("账号或密码错误");
    })
    .finally(() => {
      btnLoading.value = false;
    });
};

const sumbitLogin = () => {
  if (!formRef) return;
  formRef.value.validate((valid) => {
    if (valid) {
      slideValidationRef.value.open();
    } else {
      ElMessage.error("请正确填写账号信息");
    }
  });
};
</script>

<style></style>
