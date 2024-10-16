<template>
  <UserEssayList :list="essayList"></UserEssayList>
</template>

<script setup>
import { getEssayList, getIndexInfo } from "~/api/user";
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
