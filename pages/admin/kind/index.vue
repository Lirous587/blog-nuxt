<template>
  <div>
    <el-card shadow="always">
      <template #header>
        <AdminSearch @search="getData" @reset="resetSearchForm">
          <template #default>
            <el-input
              placeholder="标签名"
              v-model="searchForm.keyword"
              @keydown.enter="getData"
            ></el-input>
          </template>
        </AdminSearch>
        <el-button type="primary" @click="handelCreate" size="small"
          >添加
        </el-button>
      </template>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column
          label="id"
          prop="id"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column label="名称" prop="name" align="center">
        </el-table-column>
        <el-table-column label="介绍" prop="introduction" align="center">
        </el-table-column>
        <el-table-column label="图标" width="180" align="center">
          <template #default="scope">
            <el-icon>
              <component :is="scope.row.icon" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="文章数" prop="essayCount" align="center">
        </el-table-column>
        <el-table-column label="操作" prop="icon" align="center" width="180">
          <template #default="scope">
            <el-button type="warning" @click="handelEdit(scope.row)"
              >修改
            </el-button>

            <el-popconfirm
              title="确定删除?"
              confirm-button-text="确定"
              confirm-button-type="danger"
              cancel-button-text="取消"
              cancel-button-type="primary"
              icon-color="rgb(245,108,108)"
              @confirm="handelDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger">删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <div class="mt-5 flex justify-center">
          <el-pagination
            background
            layout="prev, pager,next"
            :current-page="currentPage"
            @current-change="getData"
            :page-count="pages"
          />
        </div>
      </template>
    </el-card>

    <MyDrawer
      :title="drawerTitle"
      direction="rtl"
      ref="drawerRef"
      size="50%"
      :destroy-on-close="true"
      class="dark:bg-black"
      @submit="handelSubmit"
    >
      <el-form :model="form" ref="formRef" label-width="80px" :inline="false">
        <el-form-item label="名称" prop="content">
          <el-input placeholder="请输入名称" size="large" v-model="form.name">
          </el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input
            placeholder="请输入介绍"
            v-model="form.introduction"
            type="textarea"
            :rows="3"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="图标" prop="content">
          <ChooseIcon v-model:icon="form.icon"></ChooseIcon>
        </el-form-item>
      </el-form>
    </MyDrawer>
  </div>
</template>

<script setup>
import {
  getEssayKindList,
  createEssayKind,
  deleteEssayKind,
  updateEssayKind,
} from "~/api/essay_kind";

definePageMeta({
  layout: "admin",
});

//  table
const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  pages,
  getData,
  handelDelete,
} = useInitTable({
  getList: getEssayKindList,
  delete: deleteEssayKind,
  searchForm: reactive({
    page: 1,
    limit: 10,
    keyword: "",
  }),
});

// form
const {
  drawerRef,
  form,
  formRef,
  drawerTitle,
  handelSubmit,
  handelCreate,
  handelEdit,
} = useInitForm({
  form: reactive({
    name: "",
    icon: "",
    introduction: "",
  }),
  getData,
  create: createEssayKind,
  update: updateEssayKind,
});
</script>
