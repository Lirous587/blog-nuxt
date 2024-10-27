<template>
  <div>
    <el-input
      rounded
      placeholder="搜索"
      v-model="keyword"
      clearable
      @keydown.enter="search"
    >
      <template #suffix>
        <el-icon class="cursor-pointer" @click="search">
          <Search />
        </el-icon>
      </template>
    </el-input>
  </div>
</template>

<script setup>
const route = useRoute();

const keyword = ref("");

watch(
  () => route.query.keyword,
  (newKeyword) => {
    keyword.value = newKeyword || "";
  },
  { immediate: true }
);

const search = () => {
  navigateTo(`/search-data?keyword=${keyword.value}`);
};
</script>

<style scoped>
:deep(.el-input__wrapper) {
  @apply bg-slate-50 bg-opacity-0;
}
</style>
