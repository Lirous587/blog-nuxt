<template>
  <div class="flex flex-col gap-4 mt-5 mx-5">
    <div v-for="(item, index) in list" :key="item.id">
      <el-card
        shadow="always"
        class="!rounded-md hover:!shadow-lg p-4 transition-all duration-300 ease-in-out transform hover:scale-105"
        :class="index % 2 == 0 ? '!bg-pink-50' : '!bg-green-50'"
      >
        <div class="color-text-radial">
          {{ item.content }}
        </div>
        <template #footer>
          <el-avatar
            class="float-left"
            size=""
            :src="imgPre + '/' + item.imgUrl"
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
    <Paging :total-page="totalPage" preHref="/heartWords"></Paging>
  </div>
</template>

<script setup>
import { getHeartWordsList } from "~/api/heartWords";

definePageMeta({
  middleware: ["index-data", "page-validation"],
});
const config = useRuntimeConfig();

const imgPre = config.public.imgBase;

const route = useRoute();

const queryForm = reactive({
  page: route.params.page || 1,
  pageSize: 10,
});

const list = ref([]);
const totalPage = ref(1);

const getList = async () => {
  getHeartWordsList(queryForm).then((res) => {
    const data = res.data;
    list.value = data.list;
    totalPage.value = data.totalPage;
  });
};
await getList();
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
</style>
