<template>
  <div class="flex flex-col gap-y-4">
    <UserEssayList :list="essayList"></UserEssayList>
    <Paging
      :total-page="totalPages"
      :preHref="'/kind' + '/' + queryForm.kindID"
    ></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/essay";
import { useMyIndexStore } from "~/store";

definePageMeta({
  middleware: ["index-data", "page-validation"],
  scrollToTop: true,
});

const route = useRoute();

const queryForm = reactive({
  kindID: route.params.id,
  page: route.params.page || 1,
  pageSize: 10,
});

const essayList = ref([]);
const totalPages = ref(1);

await getEssayList(queryForm).then((res) => {
  const data = res.data;
  essayList.value = data.essayList;
  totalPages.value = data.totalPages;
});

const indexStore = useMyIndexStore();
const kindList = indexStore.getKindList();
const nowKind = reactive({
  name: "",
  introduction: "",
});

const data = kindList.filter((k) => {
  return k.id == route.params.id;
})[0];

for (const key in nowKind) {
  if (data[key]) {
    nowKind[key] = data[key];
  }
}

const imgPre = useRuntimeConfig().public.imgBase + "/";

useSeoMeta({
  title: nowKind.name,
  ogTitle: nowKind.name,
  description: nowKind.introduction,
  ogDescription: nowKind.introduction,
  ogImage: imgPre + "1.png",
  twitterCard: imgPre + "1.png",
});
</script>
