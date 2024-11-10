<template>
  <div class="headerContainer">
    <div class="pl-5 flex items-center gap-x-8 sm:flex-shrink-0">
      <!-- 移动端抽屉 -->
      <div class="lg:hidden flex items-center">
        <HamburgerIcon
          color="gray"
          :size="20"
          @update:model-value="selectOpen"
          ref="iconRef"
        ></HamburgerIcon>
        <el-drawer
          v-model="mobileMenuVisiable"
          :open-delay="250"
          title="文章导航"
          size="280px"
          direction="ltr"
          append-to-body
          @close="iconRef.close()"
          class="dark:bg-black"
          :show-close="false"
        >
          <UserNavAside></UserNavAside>
        </el-drawer>
      </div>

      <NuxtLink to="/" class="nav hidden lg:block"> Lirous的日记本 </NuxtLink>
      <NuxtLink to="/" class="nav"> 首页 </NuxtLink>
      <NuxtLink to="/heartWords/1" class="nav hidden lg:block"> 心语 </NuxtLink>
      <NuxtLink to="/friendLink" class="nav hidden lg:block"> 友链 </NuxtLink>
      <NuxtLink to="/knowledge" class="nav hidden lg:block"> 我的 </NuxtLink>
    </div>

    <div class="pr-5 flex items-center gap-x-4 justify-end">
      <div class="pl-5">
        <UserSearchEssay></UserSearchEssay>
      </div>
      <!-- 设置mode -->
      <div
        class="h-[30px] w-[30px] flex flex-shrink-0 justify-center items-center dark:bg-black dark:text-neutral-300 rounded-full"
        @click="changeMode"
      >
        <el-icon v-if="nowMode === 'dark'">
          <Moon />
        </el-icon>
        <el-icon v-else>
          <Sunny />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
const mobileMenuVisiable = ref(false);
const iconRef = ref(null);

const selectOpen = (status) => {
  mobileMenuVisiable.value = status;
};

const route = useRoute();
watch(route, () => {
  mobileMenuVisiable.value = false;
});

const translateY = ref("0");

let lastTop = 0;
let nowTop = 0;

const scroll = (event) => {
  nowTop = event.target.scrollingElement.scrollTop;
  if (nowTop > lastTop && nowTop > 60) {
    translateY.value = "-60px";
  } else {
    translateY.value = "0px";
  }
  lastTop = nowTop;
};
const throttleScroll = throttle(scroll, 50);

const nowMode = ref("dark");
const changeMode = () => {
  nowMode.value === "light" ? darkMode() : lightMode();
  nowMode.value = nowMode.value === "light" ? "dark" : "light";
};

onMounted(() => {
  nowMode.value = initMode() ? initMode() : "dark";
  document.addEventListener("scroll", throttleScroll);
});
onBeforeUnmount(() => {
  document.removeEventListener("scroll", throttleScroll);
});
</script>

<style scoped>
* {
  font-family: "myFont";
}

.headerContainer {
  @apply bg-white dark:bg-black backdrop-blur-sm bg-opacity-90 fixed flex justify-between top-0 right-0 shadow-lg h-[60px] w-full z-10 transition-all duration-500 ease-linear;
  transform: translateY(v-bind(translateY));
}

.nav {
  @apply duration-300 relative cursor-pointer text-lg  whitespace-nowrap  hover:scale-125 text-gray-900 dark:text-neutral-400;
}
.nav::after {
  content: "";
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transform  duration-500 ease-in-out;
}
.nav:hover::after {
  @apply w-full;
}
</style>
