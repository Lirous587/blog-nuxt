<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <AdminSearch @search="getData" @reset="resetSearchForm">
          <template #default>
            <el-input
              placeholder="请输入关键词"
              v-model="searchForm.keyword"
            ></el-input>
          </template>
        </AdminSearch>
        <el-button type="primary" @click="handleCreate" size="small"
          >添加
        </el-button>
      </template>
      <el-table stripe :data="tableData" v-loading="loading">
        <el-table-column label="id" prop="id" width="120" align="center" />
        <el-table-column label="topic" prop="topic" align="center" />
        <el-table-column
          label="介绍"
          prop="introduction"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column label="操作" align="center" width="180">
          <template #default="scope">
            <el-button type="warning" @click="handleEdit(scope.row)"
              >修改
            </el-button>

            <el-popconfirm
              title="确定删除?"
              confirm-button-text="确定"
              confirm-button-type="danger"
              cancel-button-text="取消"
              cancel-button-type="primary"
              icon-color="rgb(245,108,108)"
              @confirm="handleDelete(scope.row.id)"
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
      @submit="handleSubmit"
    >
      <el-form
        :model="form"
        ref="formRef"
        label-width="80px"
        :inline="false"
        :rules="rules"
      >
        <el-form-item label="主题" prop="topic">
          <el-input
            placeholder="请输入主题"
            v-model="form.topic"
            :maxlength="25"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input
            placeholder="请输入介绍"
            v-model="form.introduction"
            type="textarea"
            :rows="3"
            :maxlength="120"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="md主题" prop="theme">
          <MdSelectTheme v-model:theme="form.theme"> </MdSelectTheme>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <AdminTimeEventEditContent
            :id="form.id"
            v-model:content="form.content"
          ></AdminTimeEventEditContent>
        </el-form-item>
      </el-form>
    </MyDrawer>
  </div>
</template>

<script setup>
import {
  createTimeEvent,
  deleteTimeEvent,
  getTimeEventList,
  updateTimeEvent,
} from "~/api/timeEvent";

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
  handleDelete,
} = useInitTable({
  getList: getTimeEventList,
  delete: deleteTimeEvent,
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
  handleSubmit,
  handleCreate,
  handleEdit,
  rules,
} = useInitForm({
  form: reactive({
    id: 0,
    topic: "",
    introduction: "",
    content: "",
    theme: "default",
  }),
  getData,
  create: createTimeEvent,
  update: updateTimeEvent,
  rules: {
    topic: [{ required: true, message: "请输入主题", trigger: "blur" }],
    introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
    content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  },
});
</script>
