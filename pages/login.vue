<template>
  <UserNavHeader> </UserNavHeader>
  <div class="outter">
    <div class="main">
      <Transition name="left" mode="out-in">
        <div v-if="isLogin" class="narrow">
          <h3 class="text-xl font-bold">欢迎回来！</h3>
          <small class="text-gray-400 my-5"
            >为了和我们保持联系，请登录账户</small
          >
          <MyButton
            @click="toggleForm"
            class="w-[60%] !rounded-3xl"
            size="large"
            type="success"
          >
            登录
          </MyButton>
        </div>
        <div v-else class="broad">
          <h1 class="text-xl font-bold my-3">登 录</h1>
          <MyForm class="pr-5 w-full" label-width="">
            <MyFormItem label="邮箱">
              <MyInput></MyInput>
            </MyFormItem>
            <MyFormItem label="密码">
              <MyInput></MyInput>
            </MyFormItem>
            <MyFormItem>
              <MyButton
                class="w-[80%] mx-auto !rounded-3xl"
                size="large"
                type="success
            "
                >登录
              </MyButton>
            </MyFormItem>
          </MyForm>
        </div>
      </Transition>
      <Transition name="right" mode="out-in">
        <div v-if="isLogin" class="broad">
          <h1 class="text-xl font-bold my-3">注 册</h1>
          <MyForm class="pr-5 w-full">
            <MyFormItem label="昵称">
              <MyInput></MyInput>
            </MyFormItem>
            <MyFormItem label="密码">
              <MyInput></MyInput>
            </MyFormItem>
            <MyFormItem label="重复密码">
              <MyInput></MyInput>
            </MyFormItem>
            <MyFormItem label="邮箱">
              <MyInput></MyInput>
            </MyFormItem>
            <MyFormItem label="验证码">
              <MyInput>
                <template #suffix>
                  <MyButton size="small" type="success">获取</MyButton>
                </template>
              </MyInput>
            </MyFormItem>
            <MyFormItem>
              <MyButton
                class="w-[80%] mx-auto !rounded-3xl"
                size="large"
                type="primary"
              >
                <div>注册</div>
              </MyButton>
            </MyFormItem>
          </MyForm>
        </div>
        <div v-else class="narrow">
          <h3 class="text-xl font-bold">你好，朋友！</h3>
          <small class="text-gray-400 my-5">填写您的一些信息然后加入我们</small>
          <MyButton
            @click="toggleForm"
            class="w-[80%] mx-auto !rounded-3xl"
            size="large"
            type="primary"
          >
            注册
          </MyButton>
        </div>
      </Transition>
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
</script>

<style scoped>
.broad {
  @apply w-[80vw]  md:w-[420px] flex flex-col items-center justify-center overflow-hidden;
}

.narrow {
  @apply w-[80vw] md:w-[340px] flex flex-col items-center justify-center overflow-hidden;
}

.outter {
  @apply flex w-[100vw] h-[100vh] bg-[#e4e9ea] dark:bg-[black] overflow-hidden;
  background-image: url(http://123.207.217.103:8080/api/img/26.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.main {
  @apply flex flex-col items-center justify-center m-auto rounded-xl
      md:flex-row overflow-scroll
      h-[620px]  md:h-[520px] w-[90vw] lg:w-[800px]
    bg-[rgba(255,255,255,0.8)]  dark:bg-[rgba(0,0,0,0.8)]
  backdrop-blur-sm backdrop-brightness-150;
  box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.6),
    5px 5px 10px rgba(255, 255, 255, 0.9),
    -2px -2px 5px rgba(255, 255, 255, 0.6),
    -5px -5px 10px rgba(255, 255, 255, 0.9);
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
