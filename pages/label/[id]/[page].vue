<template>
  <UserEssayList :list="essayList" :loading="pending"></UserEssayList>
  <Paging
    v-if="!pending"
    :total-page="totalPage"
    :preHref="'/label' + '/' + queryForm.labelID"
  ></Paging>
</template>

<script setup>
const route = useRoute();
const queryForm = reactive({
  labelID: route.params.id,
  page: route.params.page || 1,
  pageSize: 5,
});

const { essayList, pending, totalPage } = await lazyLoadEssayList(queryForm);
</script>
