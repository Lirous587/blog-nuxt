<template>
  <div>
    <UserNavHeader> </UserNavHeader>
    <div class="outter">
      <div class="main">
        <Transition name="left" mode="out-in">
          <UserLogin v-if="isLogin" class="broad"></UserLogin>
          <div v-else class="narrow">
            <h3 class="text-xl font-bold dark:text-gray-400">欢迎回来！</h3>
            <small class="my-5 dark:text-gray-400"
              >为了和我们保持联系，请登录账户</small
            >
            <el-button
              @click="toggleForm"
              class="w-[60%] !rounded-3xl"
              size="large"
              type="success"
            >
              前往登录
            </el-button>
          </div>
        </Transition>
        <Transition name="right" mode="out-in">
          <div v-if="isLogin" class="narrow">
            <h3 class="text-xl font-bold dark:text-gray-400">你好，朋友！</h3>
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
            <UserSignup @signup="handelSignup"></UserSignup>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const handelSignup = () => {
  isLogin.value = true;
};
</script>

<style scoped>
.broad {
  @apply w-[80vw]  md:w-[420px] flex flex-col items-center justify-center;
}

.narrow {
  @apply w-[80vw] md:w-[340px] flex flex-col items-center justify-center;
}

.outter {
  @apply flex w-[100vw] h-[100vh] bg-neutral-100  dark:bg-[black];
}
.main {
  @apply flex flex-col  items-center justify-center m-auto rounded-xl transition-all duration-1000  
   h-[v-bind(mobileHeight)]  md:flex-row md:h-[520px] w-[90vw] lg:w-[800px]
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
