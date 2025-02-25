<template>
  <div>
    <h1
      class="text-xl text-center font-bold my-3 text-yellow-500 dark:text-gray-400"
    >
      登 录
    </h1>
    <el-form ref="formRef" :model="form" :rules="rules" class="w-full">
      <el-form-item prop="email" for="email">
        <el-input v-model="form.email" name="email" placeholder="请输入邮箱">
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" for="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
          show-password
          name="password"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
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
      @confirm="handleSlideConfirm"
    ></SliderValidation>
  </div>
</template>

<script setup>
import { getUserInfo, login } from "~/api/user";
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

const handleSlideConfirm = () => {
  handleLogin();
  gotoLoginPreUrl();
};

const handleLogin = () => {
  btnLoading.value = true;
  login(form)
    .then((res) => {
      toast("登录成功");
      setUserAccessToken(res.data.token);
      setUserRefreshToken(res.data.refreshToken);
      setTimeout(() => {
        getUserInfo().then((res) => {
          const info = res.data;
          setUserInfoCookie(info);
          router.push("/");
        });
      }, 200);
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
