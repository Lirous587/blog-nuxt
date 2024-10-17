<template>
  <div v-if="loading">
    <UserEssayList :list="essayList"></UserEssayList>
    <Paging :total-pages="totalPage"></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/user";
const essayList = ref([]);
const loading = ref(false);
const totalPage = ref(1);

const queryForm = reactive({
  page: 1,
  pageSize: 5,
});

const getList = async () => {
  getEssayList(queryForm)
    .then((res) => {
      const data = res.data;
      essayList.value = data.list;
      totalPage.value = data.totalPages;
    })
    .finally(() => {
      loading.value = true;
    });
};
await getList();
</script>
