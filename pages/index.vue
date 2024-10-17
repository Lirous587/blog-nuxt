<template>
  <div v-if="loading">
    <UserEssayList :list="essayList"></UserEssayList>
    <Paging :total-pages="totalPage"></Paging>
  </div>
</template>

<script setup>
const queryForm = reactive({
  page: 1,
  pageSize: 5,
});
const { getList, essayList, loading, totalPage } =
  useCommonGetEssayList(queryForm);

await getList();
</script>
