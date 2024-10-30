<template>
  <div>
    <UserEssayList :list="essayList"></UserEssayList>
    <Paging
      :total-page="totalPage"
      :preHref="'/kind' + '/' + queryForm.kindID"
    ></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/essay";
import { useMyIndexStore } from "~/store";

definePageMeta({
  middleware: ["index-data", "page-validation"],
});

const route = useRoute();

const queryForm = reactive({
  kindID: route.params.id,
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
const kindList = indexStore.getKindList();
const nowKind = reactive({
  name: "",
  introduction: "",
  imgUrl: "",
});

const data = kindList.filter((k) => {
  return k.id == route.params.id;
})[0];

for (const key in nowKind) {
  if (data[key]) {
    nowKind[key] = data[key];
  }
}

console.log(nowKind);

const config = useRuntimeConfig();
useSeoMeta({
  title: nowKind.name,
  ogTitle: nowKind.name,
  description: nowKind.introduction,
  ogDescription: nowKind.introduction,
  ogImage: config.public.imgBase + "/" + nowKind.imgUrl,
  twitterCard: config.public.imgBase + "/" + nowKind.imgUrl,
});
</script>
