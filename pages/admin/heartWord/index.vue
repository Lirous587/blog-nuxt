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
        <el-table-column
          label="id"
          prop="id"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          label="内容"
          prop="content"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column label="出处" prop="source" align="center" />
        <el-table-column label="优先级" prop="priority" align="center" />
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
        <el-form-item label="内容" prop="content">
          <el-input
            placeholder="请输入心语内容"
            type="textarea"
            :rows="3"
            v-model="form.content"
            :maxlength="80"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="出处" show-word-limit>
          <el-input
            placeholder="请输入心语出处"
            v-model="form.source"
            prop="source"
            :maxlength="20"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="优先级">
          <el-input-number
            :min="0"
            :max="200"
            v-model="form.priority"
          ></el-input-number>
        </el-form-item>
      </el-form>
    </MyDrawer>
  </div>
</template>

<script setup>
import {
  createHeartWord,
  deleteHeartWord,
  getHeartWordList,
  updateHeartWord,
} from "~/api/heartWord";

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
  getList: getHeartWordList,
  delete: deleteHeartWord,
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
    content: "",
    source: "",
    priority: 100,
  }),
  getData,
  create: createHeartWord,
  update: updateHeartWord,
  rules: {
    content: [{ required: true, message: "请输入心语内容", trigger: "blur" }],
    source: [{ required: true, message: "请输入心语出处", trigger: "blur" }],
  },
});
</script>
