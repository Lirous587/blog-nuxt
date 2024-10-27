<template>
  <el-table :data="list" border v-loading="tableLoading">
    <el-table-column label="id" prop="id" width="100"></el-table-column>
    <el-table-column label="标签名" prop="name" width="100"></el-table-column>
    <el-table-column label="图标" prop="icon" width="100"></el-table-column>
  </el-table>

  <el-drawer v-model="drawerVisiableRef" title="添加文章" size="50%">
    <el-form :model="form" label-width="80px" :inline="false">
      <el-form-item label="文章名">
        <el-input v-model="form.name" placeholder="文章名" />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          size="large"
          style="width: 100%"
          @click="handelUpdate"
          class="mt-5"
          :loading="loading"
        >
          提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>

  <div class="bottom-3 fixed z-20">
    <el-button type="primary" size="large" @click="updatePreHandel" class="ml-3"
      >修改文章</el-button
    >
  </div>
</template>

<script setup>
import { useMyAdminStore } from "~/store/admin";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const loading = ref(false);
const tableLoading = ref(false);

const form = reactive({
  id: 0,
  name: "",
  icon: "",
});

const adminStore = useMyAdminStore();

const list = adminStore.getLabelList();

const drawerVisiableRef = ref(false);
</script>
