<template>
  <div class="pr-5 flex items-center gap-x-4 justify-end">
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
</template>

<script setup>
import { useMyThemeStore } from "~/store/theme";

const themeStore = useMyThemeStore();

const changeMode = () => {
  console.log(themeStore.theme);
  themeStore.theme === "light" ? themeStore.darkMode() : themeStore.lightMode();
};

onMounted(() => {
  themeStore.initMode();
});
</script>

<style scoped>
* {
  font-family: "myFont";
}
</style>
