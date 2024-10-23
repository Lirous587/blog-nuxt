<template>
  <UserEssayList :list="essayList" :loading="pending"></UserEssayList>
  <Paging
    v-if="!pending"
    :total-page="totalPage"
    :preHref="'/kind' + '/' + queryForm.kindID"
  ></Paging>
</template>

<script setup>
definePageMeta({
  middleware: "page-validation",
});
const route = useRoute();
const queryForm = reactive({
  kindID: route.params.id,
  page: route.params.page || 1,
  pageSize: 5,
});

const { essayList, pending, totalPage } = await lazyLoadEssayList(queryForm);
</script>
