<template>
  <div class="outter">
    <div class="main">
      <div
        class="w-[80vw] md:w-[420px] flex flex-col items-center justify-center overflow-hidden"
      >
        <h1 class="text-xl font-bold my-3 text-dark">登 录</h1>
        <el-form class="pr-5 w-full" label-width="">
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
    </div>
  </div>
</template>

<script setup>
import { adminLogin } from "~/api/admin";
definePageMeta({
  layout: "",
  scrollToTop: true,
});

const loginForm = reactive({
  email: "",
  password: "",
});

const router = useRouter();

const handelLogin = () => {
  adminLogin(loginForm)
    .then((res) => {
      toast("登录成功");
      setAdminAccessToken(res.data.token);
      setAdminRefreshToken(res.data.refreshToken);
      router.push("/admin");
    })
    .catch((err) => {
      toast("账号或密码错误", "error");
    });
};
</script>

<style scoped>
.text-dark {
  @apply dark:text-gray-400;
}

.outter {
  @apply flex w-[100vw] h-[100vh] bg-neutral-100  dark:bg-[black] overflow-hidden;
}
.main {
  @apply flex flex-col  items-center justify-center m-auto rounded-xl overflow-hidden  transition-all duration-1000 
      md:flex-row 
      h-[540px]  md:h-[520px] w-[90vw] lg:w-[800px]
  backdrop-blur-sm backdrop-brightness-150 dark:shadow-xl dark:shadow-gray-600;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 1),
    10px 10px 10px rgba(0, 0, 0, 0.5), 15px 15px 15px rgba(0, 0, 0, 0.2),
    -5px -5px 5px rgba(255, 255, 255, 0.6),
    -5px 5px 5px rgba(255, 255, 255, 0.6),
    -8px -8px 8px rgba(255, 255, 255, 0.9),
    -8px 8px 8px rgba(255, 255, 255, 0.9);
}
</style>
