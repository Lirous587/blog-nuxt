<template>
  <el-table :data="data" border>
    <el-table-column label="id" prop="id" width="100"></el-table-column>
    <el-table-column label="name">
      <template #default="scope">
        <!-- <span>{{{ scope.row.name }}</span> -->
      </template>
    </el-table-column>
    <el-table-column label="操作" width="100" fixed="right">
      <template #header="scope">
        <el-button type="link" @click="toDo(scope.row)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const searchForm = reactive({
  pageSize: 5,
  page: 1,
  keyword: "",
});
const list = ref([""]);
</script>
