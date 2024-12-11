<template>
  <div>
    <MyInput
      rounded
      placeholder="搜索"
      v-model="keyword"
      clearable
      @keydown.enter="search"
      size="small"
    >
      <template #suffix>
        <el-icon class="cursor-pointer" @click="search">
          <Search />
        </el-icon>
      </template>
    </MyInput>
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
  navigateTo(`/search?keyword=${keyword.value}`);
};
</script>
