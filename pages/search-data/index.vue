<template>
  <div v-for="item in result" :key="item.id">
    {{ item }}
  </div>
</template>

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

const searchEssay = async () => {
  if (!form.keyword) return;

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
    form.keyword = keyword;
    searchEssay();
  },
  { immediate: true }
);
</script>
