<template>
  <div>
    <el-card>
      <template #header>
        <MyButton type="primary" @click="drawerRef.open()">添加 </MyButton>
      </template>
      <el-table :data="list" border v-loading="tableLoading">
        <el-table-column
          label="id"
          prop="id"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column label="标签名" align="center" min-width="150">
          <template #default="scope">
            <MyInput size="large" v-model="scope.row.name"></MyInput>
          </template>
        </el-table-column>
        <el-table-column label="标签介绍" min-width="150" align="center">
          <template #default="scope">
            <MyInput
              placeholder="请输入标签介绍"
              v-model="scope.row.introduction"
              type="textarea"
              :rows="2"
            >
            </MyInput>
          </template>
        </el-table-column>

        <el-table-column label="操作" prop="icon" align="center" width="180">
          <template #default="scope">
            <MyButton
              type="warning"
              :loading="scope.row.loading"
              @click="handelUpdate(scope.row)"
              >修改
            </MyButton>

            <el-popconfirm
              title="确定删除该标签?"
              confirm-button-text="确定"
              confirm-button-type="danger"
              cancel-button-text="取消"
              cancel-button-type="primary"
              icon-color="rgb(245,108,108)"
              @confirm="handelDelete(scope.row)"
            >
              <template #reference>
                <MyButton type="danger">删除</MyButton>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <MyDrawer
      ref="drawerRef"
      title="添加标签"
      direction="rtl"
      size="50%"
      class="dark:bg-black"
    >
      <el-form :model="form" label-width="80px" :inline="false">
        <el-form-item label="标签名">
          <MyInput
            placeholder="请输入标签名称"
            size="large"
            v-model="form.name"
          >
          </MyInput>
        </el-form-item>
        <el-form-item label="标签介绍">
          <MyInput
            placeholder="请输入标签介绍"
            v-model="form.introduction"
            type="textarea"
            :rows="3"
          >
          </MyInput>
        </el-form-item>
        <el-form-item>
          <MyButton
            type="primary"
            size="large"
            class="mt-5 w-full"
            @click="handelCreate"
            :loading="loading"
          >
            添加</MyButton
          >
        </el-form-item>
      </el-form>
    </MyDrawer>
  </div>
</template>

<script setup>
import { createLabel, deleteLabel, updateLabel } from "~/api/label";
import { useMyAdminStore } from "~/store/admin";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const form = reactive({
  name: "",
  introduction: "",
});

const adminStore = useMyAdminStore();

const drawerRef = ref(null);

const tableLoading = ref(false);
const loading = ref(false);

const list = ref([]);

const getLabelList = () => {
  const labelList = adminStore.getLabelList();
  if (Array.isArray(labelList)) {
    list.value = labelList;
  }
};

getLabelList();

const handelCreate = () => {
  loading.value = true;
  tableLoading.value = true;
  createLabel(form)
    .then(async () => {
      toast("创建成功");
      await adminStore.updateAll();
      getLabelList();
      tableLoading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};

const handelUpdate = (row) => {
  row.loading = true;
  updateLabel(row)
    .then(() => {
      toast("修改成功");
    })
    .finally(() => {
      row.loading = false;
    });
};

const handelDelete = (row) => {
  tableLoading.value = true;
  deleteLabel(row.id)
    .then(async () => {
      toast("删除成功");
      await adminStore.updateAll();
      getLabelList();
    })
    .finally(() => {
      tableLoading.value = false;
    });
};
</script>
