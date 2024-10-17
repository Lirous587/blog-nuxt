<template>
  <div>
    <UserEssayList :list="essayList"></UserEssayList>
    <Paging :total-pages="10"></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/user";
const essayList = ref([]);
const loading = ref(false);

const getIndexData = async () => {
  getEssayList()
    .then((res) => {
      essayList.value = res.data.list;
    })
    .finally(() => {
      loading.value = true;
    });
};

await getIndexData();
</script>
