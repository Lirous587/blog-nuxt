<template>
  <div>
    <MyCard>
      <template #header>
        <MyButton type="primary" @click="drawerRef.open()">添加</MyButton>
      </template>
      <el-table :data="list" border v-loading="tableLoading">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="标签名" min-width="120" align="center">
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

        <el-table-column label="图标" width="180" align="center">
          <template #default="scope">
            <ChooseIcon v-model:icon="scope.row.icon"></ChooseIcon>
          </template>
        </el-table-column>
        <el-table-column label="文章数" prop="essayCount" align="center" />
        <el-table-column
          label="操作"
          prop="icon"
          align="center"
          min-width="200"
        >
          <template #default="scope">
            <MyButton
              type="warning"
              :loading="scope.row.loading"
              @click="handelEdit(scope.row)"
              >修改</MyButton
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
                <MyButton type="danger">删除</MyButton>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </MyCard>

    <MyDrawer
      ref="drawerRef"
      title="添加"
      direction="rtl"
      size="50%"
      class="dark:bg-black"
    >
      <MyForm :model="form" label-width="80px" :inline="false">
        <MyFormItem label="分类名">
          <MyInput placeholder="请输入分类名称" v-model="form.name"></MyInput>
        </MyFormItem>
        <MyFormItem label="分类介绍">
          <MyInput
            placeholder="请输入标签介绍"
            v-model="form.introduction"
            type="textarea"
            :rows="3"
          >
          </MyInput>
        </MyFormItem>
        <MyFormItem label="图标">
          <ChooseIcon v-model:icon="form.icon"></ChooseIcon>
        </MyFormItem>
        <MyFormItem>
          <MyButton
            type="primary"
            size="large"
            @click="handelCreate"
            class="mt-5 w-full"
            :loading="loading"
          >
            添加</MyButton
          >
        </MyFormItem>
      </MyForm>
    </MyDrawer>
  </div>
</template>

<script setup>
import { createKind, deleteKind, updateKind } from "~/api/kind";
import { useMyAdminStore } from "~/store/admin";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const form = reactive({
  name: "",
  icon: "House",
  introduction: "",
});

const adminStore = useMyAdminStore();

const drawerRef = ref(null);

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
      drawerRef.value.close();
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
