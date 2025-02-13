<template>
  <div class="mx-auto flex flex-col gap-4 mt-5 select-none">
    <el-timeline style="max-width: 900px">
      <el-timeline-item
        v-for="item in list"
        :timestamp="formateDate(item.createdTime).split(' ')[0]"
        placement="top"
      >
        <el-card
          shadow="always"
          class="relative hover:!shadow-lg transition-all duration-300 transform mb-4"
        >
          <div class="flex justify-between">
            <div class="text-pink-400 dark:text-yellow-600">
              {{ item.topic }}
            </div>

            <NuxtLink
              :to="item.relatedLink"
              class="text-pink-400 dark:text-blue-600"
            >
              {{ item.relatedLink ? "相关链接" : "" }}
            </NuxtLink>
          </div>

          <div
            class="flex flex-col md:flex-row items-center justify-around my-5"
          >
            <el-image
              class="w-full md:w-[50%] lg:w-[60%] h-[210px] md:h-[250px] lg:h-[320px] ease-in-out dark:opacity-60 hover:scale-105 transition-all duration-500"
              :src="imgPre + item.img.url"
              lazy
              fit="cover"
            ></el-image>

            <small class="mt-5 text-pink-400">
              {{ item.introduction }}
            </small>
          </div>
        </el-card>
      </el-timeline-item>
      <Paging :pages="pages" preHref="/timeEvent"></Paging>
    </el-timeline>
  </div>
</template>

<script setup>
import { getTimeEventList } from "~/api/timeEvent";
import { useMyThemeStore } from "~/store/theme";

const config = useRuntimeConfig();
const imgPre = config.public.imgGalleryBase;

definePageMeta({
  scrollToTop: true,
});

const themeStore = useMyThemeStore();

const route = useRoute();

const queryForm = reactive({
  page: route.params.page || 1,
  limit: 10,
});

const list = ref([]);
const pages = ref(1);

await getTimeEventList(queryForm).then((res) => {
  const data = res.data;
  list.value = data.list;
  pages.value = data.pages;
});
</script>

<style scoped>
@reference "assets/css/tailwind.css";

/* * {
  @apply font-serif;
} */
</style>
