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

definePageMeta({
  middleware: "page-validation",
});
const route = useRoute();
const queryForm = reactive({
  kindID: route.params.id,
  page: route.params.page || 1,
  pageSize: 5,
});

const essayList = ref([]);
const totalPage = ref(1);
const seoData = reactive({
  kindName: "",
});

await getEssayList(queryForm).then((res) => {
  const data = res.data;
  essayList.value = data.essayList;
  totalPage.value = data.totalPage;
});

const config = useRuntimeConfig();
useSeoMeta({
  title: seoData.kindName + "分类系列",
  ogTitle: seoData.kindName + "分类系列",
  // description: data.value.introduction,
  // ogDescription: data.value.introduction,
  //   ogImage: config.public.imgBase + "/" + data.value.imgUrl,
  //   twitterCard: config.public.imgBase + "/" + data.value.imgUrl,
});
</script>
