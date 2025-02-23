<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
    <div
      v-for="item in list"
      class="parent rounded-lg py-3 px-1 h-[5rem] bg-white dark:bg-gray-800 relative hover:bg-blue-400 dark:hover:bg-pink-700 transition-colors duration-300"
      :title="item.introduction"
    >
      <a
        :href="item.url"
        target="_blank"
        class="flex items-center justify-start"
      >
        <el-avatar
          size="large"
          :src="item.logo"
          class="avatar"
          style="flex-shrink: 0"
        ></el-avatar>
        <div class="flex flex-col justify-center items-start ml-2">
          <h3
            class="line-clamp-1 text-center font-bold text-lg text-[rgb(36,35,35)] dark:text-blue-200"
          >
            {{ item.siteName }}
          </h3>
          <small
            class="line-clamp-1 font-semibold text-pink-200 dark:text-gray-500"
          >
            {{ item.introduction }}</small
          >
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { getFriendLinkRandom20 } from "~/api/friendLink";

useSeoMeta({
  title: "友链模块",
  ogTitle: "友链模块",
  description: "友链申请，友链互换",
  ogDescription: "友链申请，友链互换",
});

const list = ref([]);
const getList = async () => {
  await getFriendLinkRandom20().then((res) => {
    list.value = res.data || [];
  });
};
await getList();
</script>

<style scoped>
.parent .avatar {
  transition: all;
  transition-duration: 500ms;
}
.parent:hover .avatar {
  width: 0;
  height: 0;
}
</style>
