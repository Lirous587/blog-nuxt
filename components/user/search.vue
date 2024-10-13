<template>
  <el-input
    rounded
    placeholder="搜索"
    v-model="form.keyword"
    clearable
    @change="search"
  >
    <template #suffix>
      <el-icon class="cursor-pointer"> <Search></Search> </el-icon>
    </template>
  </el-input>
</template>

<script setup>
import { useMySearchStore } from "~/store/search";

const form = reactive({
  keyword: "",
  ifAdd: true,
});

const mySearchStore = useMySearchStore();

const search = () => {
  navigateTo(`/search-data`);
  mySearchStore.setKeyword(form.keyword);
};
</script>
