<template>
  <div
    class="flex items-center justify-between mb-2 h-[40px] bg-pink-100 dark:bg-black"
  >
    <div class="flex gap-x-4 ml-3 items-center">
      <div class="flex items-center justify-center gap-x-3">
        <el-icon size="24px" color="pink" @click="toggleFullScreen"
          ><FullScreen
        /></el-icon>
        <el-icon
          v-if="status === 'collapse'"
          type="info"
          @click="expand"
          color="pink"
          size="24px"
          ><Expand
        /></el-icon>
        <el-icon v-else type="info" @click="collapse" color="pink" size="24px"
          ><Fold
        /></el-icon>
      </div>
    </div>
    <NuxtLink to="/" class="flex items-center justify-center">
      <MyIconHome></MyIconHome>
    </NuxtLink>
    <!-- 设置mode -->
    <div
      class="mr-2 flex justify-center items-center dark:bg-black dark:text-neutral-300 rounded-full"
      @click="changeMode"
    >
      <el-icon size="24px" v-if="themeStore.theme === 'dark'">
        <Moon />
      </el-icon>
      <el-icon size="24px" v-else>
        <Sunny />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { useMyThemeStore } from "~/store/theme";

const themeStore = useMyThemeStore();

const changeMode = () => {
  themeStore.theme === "light" ? themeStore.darkMode() : themeStore.lightMode();
};
const emits = defineEmits("expand", "collapse");

const status = ref("expand");

const expand = () => {
  status.value = "expand";
  emits("expand");
};
const collapse = () => {
  status.value = "collapse";
  emits("collapse");
};

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
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
});
</script>

<style scoped>
@reference "assets/css/tailwind.css";

* {
  @apply font-mono;
}
</style>
