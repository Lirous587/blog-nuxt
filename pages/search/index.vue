<template>
  <div class="flex flex-col gap-y-4">
    <UserEssayList :list="result"></UserEssayList>
  </div>
</template>

<script setup>
import { searchEssay } from "~/api/keyword";

definePageMeta({
  middleware: ["search", "index-data"],
  scrollToTop: true,
});

const route = useRoute();
const result = ref([]);
const loading = ref(false);

const form = reactive({
  keyword: "",
  ifAdd: true,
});

const searchEssayHandel = async () => {
  if (!form.keyword) return;

  loading.value = true;

  await searchEssay(form)
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
    searchEssayHandel();
  },
  { immediate: true }
);
</script>
