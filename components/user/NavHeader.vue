<template>
  <div
    class="headerContainer fixed flex justify-between top-0 right-0 shadow-lg h-[60px] w-full bg-neutral-50 dark:bg-black backdrop-blur-sm bg-opacity-90 z-10 transition-all duration-500 ease-linear;"
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
        <el-drawer
          v-model="mobileMenuVisiable"
          :open-delay="250"
          title="相关导航"
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
      <NuxtLink to="/" class="nav lg:hidden"> 首页 </NuxtLink>
    </div>

    <div class="mx-auto items-center gap-x-8 hidden lg:flex">
      <NuxtLink to="/" class="nav"> 首页 </NuxtLink>
      <NuxtLink to="/heartWords/1" class="nav"> 心语 </NuxtLink>
      <NuxtLink to="/friendLink" class="nav"> 友链 </NuxtLink>
      <NuxtLink to="/me" class="nav"> 我的 </NuxtLink>
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
    </div>
  </div>
</template>

<script setup>
import { useMyThemeStore } from "~/store/theme";

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

const themeStore = useMyThemeStore();

const changeMode = () => {
  console.log(themeStore.theme);
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
  font-family: "myFont";
}

.headerContainer {
  transform: translateY(v-bind(translateY));
}
.nav {
  @apply duration-300 relative cursor-pointer text-lg  whitespace-nowrap  hover:scale-125 text-pink-600 dark:text-neutral-400;
}
.nav::after {
  content: "";
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transform  duration-500 ease-in-out;
}
.nav:hover::after {
  @apply w-full;
}
</style>
