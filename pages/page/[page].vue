<template>
  <div class="flex flex-col gap-y-4">
    <UserEssayList :list="essayList"></UserEssayList>
    <Paging :total-page="totalPage"></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/essay";

definePageMeta({
  middleware: ["page-validation", "index-data"],
});

const route = useRoute();
const queryForm = reactive({
  page: route.params.page || 1,
  pageSize: 10,
});

const essayList = ref([]);
const totalPage = ref(1);
await getEssayList(queryForm).then((res) => {
  const data = res.data;
  essayList.value = data.essayList;
  totalPage.value = data.totalPage;
});
</script>
