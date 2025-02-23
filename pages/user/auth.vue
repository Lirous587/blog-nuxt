<template>
  <div
    class="h-[520px] md:h-[480px] bg-white dark:bg-gray-800 opacity-90 backdrop-blur-2xl shadow-2xs absolute top-[50%] left-[50%] translate-[-50%] flex flex-col items-center justify-center rounded-xl transition-all duration-500 md:flex-row"
  >
    <Transition name="left" mode="out-in">
      <div
        v-if="isLogin && !isResetPwd"
        class="w-[85vw] md:w-[380px] shadow-xl px-4 mx-3"
      >
        <UserAuthLogin></UserAuthLogin>
      </div>
      <div
        v-else
        class="w-[85vw] md:w-[380px] flex flex-col items-center justify-center"
      >
        <h3 class="text-xl font-bold dark:text-gray-400 text-pink-400">
          欢迎回来！
        </h3>
        <small class="my-2 text-gray-400"
          >为了和我们保持联系，请
          <span
            type="text"
            @click="toLogin"
            class="text-blue-400 underline underline-offset-2 hover:cursor-pointer"
            >登录账户</span
          >
        </small>
      </div>
    </Transition>
    <Transition name="right" mode="out-in">
      <div
        v-if="isLogin && !isResetPwd"
        class="w-[85vw] md:w-[380px] flex flex-col items-center justify-center"
      >
        <small class="text-gray-400 my-5"
          >将要填写您的一些信息
          <span
            @click="isLogin = false"
            class="text-blue-400 underline underline-offset-2 hover:cursor-pointer"
            >前往注册</span
          >
        </small>
        <small class="text-gray-400"
          >忘记了账号密码
          <span
            @click="toResetPWd"
            class="text-blue-400 underline underline-offset-2 hover:cursor-pointer"
            >找回密码</span
          >
        </small>
      </div>
      <div
        v-else-if="!isResetPwd"
        class="w-[85vw] md:w-[380px] shadow-xl px-4 mx-3"
      >
        <UserAuthSignup @signup="handleSignup"></UserAuthSignup>
      </div>
      <div v-else class="w-[85vw] md:w-[380px] shadow-xl px-4 mx-3">
        <UserAuthResetPwd @reset-password="handleResetPWd"></UserAuthResetPwd>
      </div>
    </Transition>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});

const isLogin = ref(true);

const isResetPwd = ref(false);

const toResetPWd = () => {
  isResetPwd.value = true;
};

const toLogin = () => {
  isResetPwd.value = false;
  isLogin.value = true;
};

const handleSignup = () => {
  isLogin.value = true;
};

const handleResetPWd = () => {
  isResetPwd.value = false;
};
</script>

<style scoped>
@reference "assets/css/tailwind.css";

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
