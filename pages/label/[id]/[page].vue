<template>
  <div class="flex flex-col gap-y-4">
    <UserEssayList :list="list"></UserEssayList>
    <Paging
      :total-page="totalPages"
      :preHref="'/label' + '/' + queryForm.labelID"
    ></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/essay";
import { useMyIndexStore } from "~/store";

definePageMeta({
  middleware: ["page-validation", "index-data"],
  scrollToTop: true,
});
const route = useRoute();
const queryForm = reactive({
  labelID: route.params.id,
  page: route.params.page || 1,
  pageSize: 10,
});
const list = ref([]);
const totalPages = ref(1);
await getEssayList(queryForm).then((res) => {
  const data = res.data;
  list.value = data.list;
  totalPages.value = data.totalPages;
});

const indexStore = useMyIndexStore();
const labelList = indexStore.getLabelList();
const nowLabel = reactive({
  name: "",
  introduction: "",
});

const data = labelList.filter((l) => {
  return l.id == route.params.id;
})[0];

for (const key in nowLabel) {
  if (data[key]) {
    nowLabel[key] = data[key];
  }
}

const imgPre = useRuntimeConfig().public.imgGalleryBase + "/";

useSeoMeta({
  title: nowLabel.name,
  ogTitle: nowLabel.name,
  description: nowLabel.introduction,
  ogDescription: nowLabel.introduction,
  ogImage: imgPre + "1.png",
  twitterCard: imgPre + "1.png",
});
</script>
