<template>
  <div>
    <UserEssayList :list="essayList"></UserEssayList>
    <Paging :total-page="totalPage"></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/essay";

definePageMeta({
  middleware: "user",
});

const route = useRoute();
const queryForm = reactive({
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
</script>
