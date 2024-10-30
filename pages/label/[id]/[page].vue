<template>
  <div>
    <UserEssayList :list="essayList"></UserEssayList>
    <Paging
      :total-page="totalPage"
      :preHref="'/label' + '/' + queryForm.labelID"
    ></Paging>
  </div>
</template>

<script setup>
import { getEssayList } from "~/api/essay";

definePageMeta({
  middleware: ["page-validation", "index-data"],
});
const route = useRoute();
const queryForm = reactive({
  labelID: route.params.id,
  page: route.params.page || 1,
  pageSize: 5,
});
const essayList = ref([]);
const totalPage = ref(1);
await getEssayList(queryForm).then((res) => {
  const data = res.data;
  essayList.value = data.essayList;
  totalPage.value = data.totalPage;
});
</script>
