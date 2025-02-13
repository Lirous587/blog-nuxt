<template>
  <el-header
    class="left-0 right-0 top-0 flex justify-between shadow-lg h-[60px] bg-pink-100 dark:bg-black z-[100] backdrop-blur-sm"
  >
    <div class="flex gap-x-4 items-center">
      <div class="flex items-center justify-center gap-x-3">
        <el-icon
          size="24px"
          @click="toggleFullScreen"
          :color="themeStore.theme === 'dark' ? 'white' : 'purple'"
        >
          <Aim v-if="isFullscreen" />
          <FullScreen v-else />
        </el-icon>
        <el-icon
          size="24px"
          @click="toggleAsideStatus"
          :color="themeStore.theme === 'dark' ? 'white' : 'purple'"
        >
          <Expand v-if="asideStatus === 'collapse'" />
          <Fold v-else />
        </el-icon>
      </div>
    </div>
    <NuxtLink to="/" class="my-auto">
      <MyIconHome></MyIconHome>
    </NuxtLink>
    <!-- 设置mode -->
    <div
      class="mr-2 flex justify-center items-center rounded-full"
      @click="changeMode"
    >
      <el-icon size="24px" v-if="themeStore.theme === 'dark'">
        <Moon />
      </el-icon>
      <el-icon size="24px" v-else color="purple">
        <Sunny />
      </el-icon>
    </div>
  </el-header>
</template>

<script setup>
import { useMyThemeStore } from "~/store/theme";

const themeStore = useMyThemeStore();

const changeMode = () => {
  themeStore.theme === "light" ? themeStore.darkMode() : themeStore.lightMode();
};
const emits = defineEmits("expand", "collapse");

const asideStatus = ref("expand");

const toggleAsideStatus = () => {
  if (asideStatus.value === "expand") {
    asideStatus.value = "collapse";
    emits("collapse");
  } else {
    asideStatus.value = "expand";
    emits("expand");
  }
};

const isFullscreen = ref(!!document.fullscreenElement);

const updateFullscreenStatus = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

const toggleFullScreen = () => {
  if (!isFullscreen.value) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen();
  }
};

onMounted(() => {
  themeStore.initMode();
  document.addEventListener("fullscreenchange", updateFullscreenStatus);
});

onBeforeUnmount(() => {
  document.removeEventListener("fullscreenchange", updateFullscreenStatus);
});
</script>
