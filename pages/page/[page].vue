<template>
  <UserEssayList :list="essayList"></UserEssayList>
  <Paging :total-pages="10"></Paging>
</template>

<script setup>
import { getEssayList } from "~/api/user";
const essayList = ref([]);
const loading = ref(false);
const page = reactive({
  current: 1,
  total: 1,
});
const route = useRoute();

page.current = route.params.page;

const getIndexData = async () => {
  getEssayList()
    .then((res) => {
      const data = res.data;
      essayList.value = data.list;
      page.total = data.totalPages;
    })
    .finally(() => {
      loading.value = true;
    });
};
await getIndexData();
</script>
