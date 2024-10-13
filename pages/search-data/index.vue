<template>
  <div></div>
</template>

<script setup>
import { searchData } from "~/api/keyword";
const route = useRoute();

const form = reactive({
  ifAdd: true,
  keyword: "",
});
form.keyword = route.query.keyword;

onMounted(() => {
  searchData(form).then((res) => {
    if (res.data) {
      result.value = res.data;
    } else {
      ElMessage.warning("没有查找到相关数据");
    }
  });
});
</script>

<style></style>
