<template>
  <div
    class="headerContainer fixed flex justify-between top-0 right-0 shadow-lg h-[60px] w-full bg-white dark:bg-black transition-all duration-500 ease-linear z-[999] bg-opacity-80 backdrop-blur-md backdrop-brightness-90 backdrop-contrast-200 backdrop-opacity-90 backdrop-saturate-100"
  >
    <div class="pl-5 flex items-center gap-x-4">
      <NuxtLink to="/" class="nav hidden lg:block"> Lirous的日记本 </NuxtLink>
      <!-- 移动端抽屉 -->
      <div class="lg:hidden flex items-center">
        <HamburgerIcon
          color="gray"
          :size="20"
          @update:model-value="selectOpen"
          ref="iconRef"
        ></HamburgerIcon>
        <MyDrawer
          title="相关导航"
          direction="ltr"
          size="280px"
          class="dark:bg-black"
          :open-delay="250"
          ref="drawerRef"
          @close="iconRef.close()"
        >
          <UserNavAside class="overflow-hidden"></UserNavAside>
        </MyDrawer>
      </div>
      <NuxtLink to="/" class="nav flex items-center justify-center lg:hidden">
        <MyIconHome />
      </NuxtLink>
    </div>

    <div class="mx-auto items-center gap-x-8 hidden lg:flex">
      <NuxtLink to="/" class="nav flex items-center justify-center">
        <MyIconHome />
        <span>首页</span>
      </NuxtLink>
      <!-- 心语 -->
      <NuxtLink to="/heartWords/1" class="nav flex items-center justify-center">
        <MyIconHeart />
        <span>心语</span>
      </NuxtLink>
      <!-- 友链 -->
      <NuxtLink to="/friendLink" class="nav flex items-center justify-center">
        <MyIconLink />
        <span>友链</span>
      </NuxtLink>
      <!-- 我的 -->
      <NuxtLink to="/me" class="nav flex items-center justify-center">
        <MyIconStar />
        <span>我的</span>
      </NuxtLink>
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
        <el-icon v-if="themeStore.theme === 'dark'">
          <Moon />
        </el-icon>
        <el-icon v-else>
          <Sunny />
        </el-icon>
      </div>
      <!-- 登录 -->
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { useMyThemeStore } from "~/store/theme";

const drawerRef = ref(null);
const iconRef = ref(null);

const selectOpen = () => {
  drawerRef.value.open();
};

const route = useRoute();
watch(route, () => {
  drawerRef.value.close();
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

const themeStore = useMyThemeStore();

const changeMode = () => {
  themeStore.theme === "light" ? themeStore.darkMode() : themeStore.lightMode();
};

onMounted(() => {
  themeStore.initMode();
  document.addEventListener("scroll", throttleScroll);
});
onBeforeUnmount(() => {
  document.removeEventListener("scroll", throttleScroll);
});
</script>

<style scoped>
* {
  @apply font-serif;
}

.headerContainer {
  transform: translateY(v-bind(translateY));
}
.nav {
  @apply gap-x-1 duration-300 relative cursor-pointer whitespace-nowrap  hover:scale-110 text-pink-600 dark:text-neutral-400 lg:text-lg;
}
.nav::after {
  content: "";
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transform  duration-500 ease-in-out;
}
.nav:hover::after {
  @apply w-full;
}
</style>
