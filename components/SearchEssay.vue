<template>
  <div>
    <div class="hidden md:block">
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

    <div class="md:hidden">
      <el-input
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
      </el-input>
    </div>
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
