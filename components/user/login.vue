<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-xl font-bold my-3 dark:text-gray-400">登 录</h1>
    <el-form class="pr-5 w-full" label-width="80px">
      <el-form-item label="邮箱">
        <el-input v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          show-password
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="w-[80%] mx-auto !rounded-3xl"
          size="large"
          type="success"
          @click="handelLogin"
          >登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { login } from "~/api/user";
const loginForm = reactive({
  email: "",
  password: "",
});

const handelLogin = () => {
  login(loginForm)
    .then((res) => {
      toast("登录成功");
      setUserAccessToken(res.data.token);
      setUserRefreshToken(res.data.refreshToken);
      router.push("/");
    })
    .catch((err) => {
      toast("账号或密码错误", "error");
    });
};
</script>

<style></style>
