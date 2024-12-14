<template>
  <div>
    <UserNavHeader> </UserNavHeader>
    <div class="outter">
      <div class="main">
        <Transition name="left" mode="out-in">
          <div v-if="isLogin" class="broad">
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
          <div v-else class="narrow">
            <h3 class="text-xl font-bold text-dark">欢迎回来！</h3>
            <small class="text-gray-400 my-5 text-dark"
              >为了和我们保持联系，请登录账户</small
            >
            <el-button
              @click="toggleForm"
              class="w-[60%] !rounded-3xl text-dark"
              size="large"
              type="success"
            >
              前往登录
            </el-button>
          </div>
        </Transition>
        <Transition name="right" mode="out-in">
          <div v-if="isLogin" class="narrow">
            <h3 class="text-xl font-bold text-dark">你好，朋友！</h3>
            <small class="text-gray-400 my-5"
              >填写您的一些信息然后加入我们</small
            >
            <el-button
              @click="toggleForm"
              class="w-[80%] mx-auto !rounded-3xl"
              size="large"
              type="primary"
            >
              前往注册
            </el-button>
          </div>
          <div v-else class="broad">
            <h1 class="text-xl font-bold my-3 text-dark">注 册</h1>
            <el-form class="pr-5 w-full">
              <el-form-item label="昵称">
                <el-input v-model="signupForm.name"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="signupForm.email"></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input v-model="signupForm.validationCode">
                  <template #suffix>
                    <el-button
                      @click="handelSentSignupValidationCode"
                      size="small"
                      type="success"
                      >获取</el-button
                    >
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  type="password"
                  show-password
                  v-model="signupForm.password"
                ></el-input>
              </el-form-item>
              <el-form-item label="重复密码">
                <el-input
                  type="password"
                  show-password
                  v-model="signupForm.rePassword"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button
                  class="w-[80%] mx-auto !rounded-3xl"
                  size="large"
                  type="primary"
                  @click="handelSignup"
                >
                  注册
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login, sentSignupValidationCode, signup } from "~/api/user";
definePageMeta({
  layout: "",
  scrollToTop: true,
});

const isLogin = ref(true);

const toggleForm = () => {
  isLogin.value = !isLogin.value;
};

const mobileHeight = computed(() => {
  return isLogin.value ? "540px" : "420px";
});

const signupForm = reactive({
  name: "",
  password: "",
  rePassword: "",
  email: "",
  validationCode: "",
});

const loginForm = reactive({
  email: "",
  password: "",
});

const router = useRouter();

const handelSentSignupValidationCode = () => {
  sentSignupValidationCode(signupForm)
    .then(() => {
      toast("验证码发送成功");
    })
    .catch(() => {
      toast("验证码发送失败,请稍后重试", "waring");
    });
};

const handelSignup = () => {
  signup(signupForm)
    .then(() => {
      toast("注册成功");
      resetForm(signupForm);
    })
    .catch(() => {
      toast("注册失败,身份验证错误", "error");
    });
};

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

<style scoped>
.text-dark {
  @apply dark:text-gray-400;
}
.broad {
  @apply w-[80vw]  md:w-[420px] flex flex-col items-center justify-center overflow-hidden;
}

.narrow {
  @apply w-[80vw] md:w-[340px] flex flex-col items-center justify-center overflow-hidden;
}

.outter {
  @apply flex w-[100vw] h-[100vh] bg-neutral-100  dark:bg-[black] overflow-hidden;
  /* background-image: url(http://123.207.217.103:8080/api/img/26.jpg);
  background-repeat: no-repeat;
  background-size: cover; */
}
.main {
  @apply flex flex-col  items-center justify-center m-auto rounded-xl overflow-hidden  transition-all duration-1000 
      md:flex-row 
      h-[v-bind(mobileHeight)]  md:h-[520px] w-[90vw] lg:w-[800px]
  backdrop-blur-sm backdrop-brightness-150 dark:shadow-xl dark:shadow-gray-600;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 1),
    10px 10px 10px rgba(0, 0, 0, 0.5), 15px 15px 15px rgba(0, 0, 0, 0.2),
    -5px -5px 5px rgba(255, 255, 255, 0.6),
    -5px 5px 5px rgba(255, 255, 255, 0.6),
    -8px -8px 8px rgba(255, 255, 255, 0.9),
    -8px 8px 8px rgba(255, 255, 255, 0.9);
}

.left-enter-from,
.left-leave-to {
  @apply translate-y-[100%] md:translate-y-[0%] md:translate-x-[100%] opacity-0;
}
.left-enter-active,
.left-leave-active {
  @apply translate-y-[50%] md:translate-y-[0%] md:translate-x-[50%] transition-all duration-1000;
}
.left-enter-to,
.left-leave-from {
  @apply translate-y-[0] md:translate-y-[0%] md:translate-x-[0] opacity-100;
}

.right-enter-from,
.right-leave-to {
  @apply translate-y-[-100%] md:translate-y-[0%] md:translate-x-[-100%] opacity-0;
}
.right-enter-active,
.right-leave-active {
  @apply translate-y-[-50%] md:translate-y-[0%] md:translate-x-[-50%] transition-all duration-1000;
}
.right-enter-to,
.right-leave-from {
  @apply translate-y-[0] md:translate-y-[0%] md:translate-x-[0] opacity-100;
}
</style>
