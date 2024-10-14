<template>
  <div class="h-[2000px]"></div>
</template>

<script setup>
const keywords = ref(["关键词1", "关键词2", "关键词3"]);
const metaKeywords = computed(() => keywords.value.join(","));
const title = ref("网站标题");
const metaTitle = computed(() => title.value);
useHead({
  title: metaTitle,
  meta: [{ name: "keywords", content: metaKeywords }],
});
</script>
