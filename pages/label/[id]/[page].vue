<template>
  <div>
    <UserEssayList :list="essayList"></UserEssayList>
    <Paging
      :total-page="totalPage"
      :preHref="'/label' + '/' + queryForm.labelID"
    ></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/essay";
import { useMyIndexStore } from "~/store";

definePageMeta({
  middleware: ["page-validation", "index-data"],
});
const route = useRoute();
const queryForm = reactive({
  labelID: route.params.id,
  page: route.params.page || 1,
  pageSize: 5,
});
const essayList = ref([]);
const totalPage = ref(1);
await getEssayList(queryForm).then((res) => {
  const data = res.data;
  essayList.value = data.essayList;
  totalPage.value = data.totalPage;
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

const config = useRuntimeConfig();
useSeoMeta({
  title: nowLabel.name,
  ogTitle: nowLabel.name,
  description: nowLabel.introduction,
  ogDescription: nowLabel.introduction,
  ogImage: config.public.imgBase + "/" + "1.png",
  twitterCard: config.public.imgBase + "/" + "1.png",
});
</script>
