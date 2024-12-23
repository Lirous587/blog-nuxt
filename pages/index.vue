<template>
  <div class="flex flex-col gap-y-4">
    <UserEssayList :list="list"></UserEssayList>
    <Paging :total-page="totalPages"></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/essay";



const route = useRoute();
const queryForm = reactive({
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
</script>
