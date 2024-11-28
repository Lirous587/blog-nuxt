<template>
  <div class="flex flex-col gap-y-4">
    <UserEssayList :list="essayList"></UserEssayList>
    <Paging :total-page="totalPages"></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/essay";

definePageMeta({
  middleware: "index-data",
});

const route = useRoute();
const queryForm = reactive({
  page: route.params.page || 1,
  page_size: 10,
});
const essayList = ref([]);
const totalPages = ref(1);

await getEssayList(queryForm).then((res) => {
  const data = res.data;
  essayList.value = data.essay_list;
  totalPages.value = data.total_pages;
});
</script>
