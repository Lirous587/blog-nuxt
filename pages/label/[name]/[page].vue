<template>
  <div v-if="loading">
    <UserEssayList :list="essayList"></UserEssayList>
    <Paging
      :pre-href="'/label/' + queryForm.label"
      :total-pages="totalPage"
    ></Paging>
  </div>
</template>

<script setup>
const route = useRoute();
const queryForm = reactive({
  label: route.params.name,
  page: route.params.page,
  pageSize: 5,
});

const { getList, form, essayList, loading, totalPage } =
  useCommonGetEssayList(queryForm);

await getList();

watch(
  () => route.params.page,
  async (page) => {
    form.page = page;
    await getList();
  }
);
</script>
