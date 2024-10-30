<template>
  <el-card>
    <template #header>
      <el-button type="primary" @click="drawerVisiableRef = true"
        >添加</el-button
      >
    </template>
    <el-table :data="list" border v-loading="tableLoading">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column
        label="标签名"
        prop="name"
        min-width="120"
        align="center"
      >
        <template #default="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="图标" prop="icon" width="180" align="center">
        <template #default="scope">
          <ChooseIcon v-model:icon="scope.row.icon"></ChooseIcon>
        </template>
      </el-table-column>
      <el-table-column label="文章数" prop="essayCount" align="center" />
      <el-table-column label="操作" prop="icon" align="center" min-width="200">
        <template #default="scope">
          <el-button
            type="warning"
            :loading="scope.row.loading"
            @click="handelEdit(scope.row)"
            >修改</el-button
          >

          <el-popconfirm
            title="确定删除该分类?"
            confirm-button-text="确定"
            confirm-button-type="danger"
            cancel-button-text="取消"
            cancel-button-type="primary"
            icon-color="rgb(245,108,108)"
            @confirm="handelDelete(scope.row)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-drawer
    title="添加"
    direction="rtl"
    v-model="drawerVisiableRef"
    size="50%"
    append-to-body
  >
    <el-form :model="form" label-width="80px" :inline="false">
      <el-form-item label="分类名">
        <el-input placeholder="请输入分类名称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <ChooseIcon v-model:icon="form.icon"></ChooseIcon>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="large"
          @click="handelCreate"
          class="mt-5 w-full"
          :loading="loading"
        >
          添加</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { createKind, deleteKind, updateKind } from "~/api/admin";
import { useMyAdminStore } from "~/store/admin";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const form = reactive({
  name: "",
  icon: "House",
  
});

const adminStore = useMyAdminStore();

const drawerVisiableRef = ref(false);

const tableLoading = ref(false);
const loading = ref(false);

const list = ref([]);

const getKindList = () => {
  const kindList = adminStore.getKindList();
  if (Array.isArray(kindList)) {
    list.value = kindList.map((o) => {
      return {
        ...o,
        loading: false,
      };
    });
  }
};
getKindList();

const handelCreate = () => {
  loading.value = true;
  tableLoading.value = true;
  createKind(form)
    .then(async () => {
      toast("创建成功");
      drawerVisiableRef.value = false;
      await adminStore.updateAll();
      getKindList();
      tableLoading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};

const handelEdit = (row) => {
  row.loading = true;
  updateKind(row)
    .then(() => {
      toast("修改成功");
    })
    .finally(() => {
      row.loading = false;
    });
};

const handelDelete = (row) => {
  tableLoading.value = true;
  deleteKind(row.id)
    .then(async () => {
      toast("删除成功");
      await adminStore.updateAll();
      getKindList();
    })
    .finally(() => {
      tableLoading.value = false;
    });
};
</script>
