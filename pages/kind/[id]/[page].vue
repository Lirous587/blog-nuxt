<template>
  <div class="flex flex-col gap-y-4">
    <EssayList :list="list"></EssayList>
    <Paging :pages="pages" :preHref="'/kind' + '/' + queryForm.kindID"></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/essay";
import { useMyIndexStore } from "~/store";

definePageMeta({
  middleware: ["page-validation"],
  scrollToTop: true,
});

const route = useRoute();

const queryForm = reactive({
  kindID: route.params.id,
  page: parseInt(route.params.page) || 1,
  limit: 8,
});

const list = ref([]);
const pages = ref(1);

await getEssayList(queryForm).then((res) => {
  const data = res.data;
  list.value = data.list;
  pages.value = data.pages;
});

const indexStore = useMyIndexStore();
const kinds = indexStore.getKinds();
const nowKind = reactive({
  name: "",
  introduction: "",
});

const data = kinds.filter((k) => {
  return k.id == route.params.id;
})[0];

for (const key in nowKind) {
  if (data[key]) {
    nowKind[key] = data[key];
  }
}

const imgPre = useRuntimeConfig().public.imgGalleryBase;

useSeoMeta({
  title: nowKind.name,
  ogTitle: nowKind.name,
  description: nowKind.introduction,
  ogDescription: nowKind.introduction,
  ogImage: imgPre + "1.png",
  twitterCard: imgPre + "1.png",
});
</script>
