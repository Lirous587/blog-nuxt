<template>
  <div class="flex flex-col gap-y-4">
    <EssayList :list="list"></EssayList>
    <Paging :pages="pages"></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/essay";

definePageMeta({
  middleware: ["page-validation"],
  scrollToTop: true,
});

const route = useRoute();
const queryForm = reactive({
  page: route.params.page || 1,
  limit: 10,
});

const list = ref([]);
const pages = ref(1);
await getEssayList(queryForm).then((res) => {
  const data = res.data;
  list.value = data.list;
  pages.value = data.pages;
});
</script>
