<template>
  <div class="flex flex-col gap-4 mt-5 mx-5">
    <div v-for="(item, index) in list" :key="item.id">
      <el-card
        shadow="always"
        class="!rounded-md hover:!shadow-lg p-4 transition-all duration-300 ease-in-out transform hover:scale-105"
        :class="
          index % 2 == 0
            ? '!bg-pink-50 dark:!bg-black'
            : '!bg-green-50 dark:!bg-black'
        "
      >
        <div class="color-text-radial">
          {{ item.content }}
        </div>
        <template #footer>
          <el-avatar
            class="float-left"
            size=""
            :src="imgPre + item.img.url"
          ></el-avatar>
          <div class="float-right relative flex items-center">
            <span
              class="absolute w-[30px] h-[1px] -translate-y-1/2 top-1/2 left-[-33px] bg-gray-400"
            ></span>
            <span class="color-text"> {{ item.source }}</span>
          </div>
        </template>
      </el-card>
    </div>
    <Paging :totalPages="totalPages" preHref="/heartWords"></Paging>
  </div>
</template>

<script setup>
import { getHeartWordsList } from "~/api/heartWords";

definePageMeta({
  middleware: ["page-validation", "index-data"],
  scrollToTop: true,
});
const config = useRuntimeConfig();
const imgPre = config.public.imgBase + "/";
const route = useRoute();

const queryForm = reactive({
  page: route.params.page || 1,
  page_size: 10,
});

const list = ref([]);
const totalPages = ref(1);

await getHeartWordsList(queryForm).then((res) => {
  const data = res.data;
  list.value = data.list;
  totalPages.value = data.total_pages;
});
</script>

<style scoped>
* {
  font-family: "myFont";
}

.color-text {
  @apply cursor-pointer text-lg;
  background: linear-gradient(
    to right,
    rgb(205, 79, 140),
    rgb(91, 112, 208),
    rgb(232, 146, 114)
  );
  color: transparent;
  background-clip: text;
}

.color-text-radial {
  @apply cursor-pointer text-lg;
  background: radial-gradient(
    circle at center,
    rgb(54, 88, 89),
    rgb(91, 112, 208),
    rgb(227, 168, 80)
  );
  color: transparent;
  background-clip: text;
}

:deep(.el-card) {
  @apply dark:border-gray-600;
}
:deep(.el-card__footer) {
  @apply dark:border-t-gray-600;
}
</style>
