<template>
  <div v-if="pending">正在渲染</div>
  <div v-else>
    <UserEssayList :list="essayList"></UserEssayList>
    <Paging :total-page="totalPage"></Paging>
  </div>
</template>

<script setup>
const queryForm = reactive({
  page: 1,
  pageSize: 5,
});

const { essayList, pending, totalPage } = await lazyLoadEssayList(queryForm);
</script>
