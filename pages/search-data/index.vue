<template></template>

<script setup>
import { searchData } from "~/api/keyword";

definePageMeta({
  middleware: "search-data",
});

const route = useRoute();
const result = ref([]);
const loading = ref(false);

const form = reactive({
  keyword: "",
  ifAdd: true,
});

const searchEssay = async (keyword) => {
  if (!keyword) return;

  loading.value = true;

  await searchData(form)
    .then((res) => {
      result.value = res.data || [];
    })
    .finally(() => {
      loading.value = false;
    });
};

watch(
  () => route.query.keyword,
  async (keyword) => {
    if (import.meta.client) {
      form.keyword = keyword;
      await searchEssay(keyword);
    }
  },
  { immediate: true }
);
</script>
