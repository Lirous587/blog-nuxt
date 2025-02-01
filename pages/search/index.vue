<template>
  <div class="flex flex-col gap-y-4">
    <EssayList :list="result"></EssayList>
  </div>
</template>

<script setup>
import { searchEssay } from "~/api/essay";

definePageMeta({
  middleware: ["search"],
  scrollToTop: true,
});

const route = useRoute();
const result = ref([]);
const loading = ref(false);

const form = reactive({
  keyword: "",
  ifAdd: true,
});

const searchEssayhandle = async () => {
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
    searchEssayhandle();
  },
  { immediate: true }
);
</script>
