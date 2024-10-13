<template>
  <el-input
    rounded
    placeholder="搜索"
    v-model="keyword"
    clearable
    @change="search"
  >
    <template #suffix>
      <el-icon class="cursor-pointer" @click="search">
        <Search />
      </el-icon>
    </template>
  </el-input>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const keyword = ref("");

watch(
  () => route.query.keyword,
  (newKeyword) => {
    keyword.value = newKeyword || "";
  },
  { immediate: true }
);

const search = () => {
  router.push(`/search-data?keyword=${keyword.value}`);
};
</script>
