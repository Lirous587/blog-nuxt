<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <AdminSearch @search="getData" @reset="resetSearchForm">
          <template #default>
            <el-input
              placeholder="请输入关键词"
              v-model="searchForm.keyword"
              @keydown.enter="getData"
            ></el-input>
          </template>
        </AdminSearch>
        <el-button type="primary" @click="handleCreate" size="small"
          >添加
        </el-button>
      </template>

      <el-table stripe :data="tableData" v-loading="loading">
        <el-table-column type="expand">
          <template #default="scope">
            <EssayCommentBody :eid="scope.row.id"></EssayCommentBody>
          </template>
        </el-table-column>
        <el-table-column
          label="id"
          prop="id"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column label="文章名" prop="name" align="center">
        </el-table-column>
        <el-table-column
          label="简介"
          prop="introduction"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template #default="scope">
            <el-avatar :src="imgPre + scope.row.img.url"></el-avatar>
          </template>
        </el-table-column>
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
      size="80%"
      :destroy-on-close="true"
      class="dark:bg-black"
      @submit="handleSubmit"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="文章名" prop="name">
          <el-input
            v-model="form.name"
            placeholder="文章名"
            :maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="标签" prop="labelIds">
          <AdminEssaySelectLabels
            v-model:ids="form.labelIds"
          ></AdminEssaySelectLabels>
        </el-form-item>
        <el-form-item label="代码主题">
          <MdSelectTheme v-model:theme="form.theme"> </MdSelectTheme>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <AdminEssayEditContent
            :id="form.id"
            :theme="form.theme"
            v-model:content="form.content"
          ></AdminEssayEditContent>
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input
            v-model="form.introduction"
            placeholder="介绍"
            class="input"
            :maxlength="160"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="文章图片" prop="img">
          <ImgSelect v-model:id="form.img.id" :url="form.img.url"></ImgSelect>
        </el-form-item>
        <el-form-item label="优先级">
          <el-input-number
            v-model="form.priority"
            :min="0"
            :max="200"
          ></el-input-number>
        </el-form-item>
      </el-form>
    </MyDrawer>
  </div>
</template>

<script setup>
import {
  createEssay,
  deleteEssay,
  getEssayList,
  updateEssay,
} from "~/api/essay";

definePageMeta({
  layout: "admin",
});

provide("admin", true);

const config = useRuntimeConfig();
const imgPre = config.public.imgGalleryBase;

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
  getList: getEssayList,
  delete: deleteEssay,
  searchForm: reactive({
    page: 1,
    limit: 8,
    keyword: "",
  }),
  onGetListSuccess: (data) => {
    const list = data.list;
    if (Array.isArray(list)) {
      list.forEach((element) => {
        if (Array.isArray(element?.labelList)) {
          element.labelIds = element.labelList.map((o) => {
            return o.id;
          });
        }
      });
    }
    tableData.value = list;
    pages.value = data.pages;
  },
  onBerfoerEdit: () => {},
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
    name: "",
    labelIds: [],
    introduction: "",
    content: "",
    priority: 100,
    theme: "default",
    img: {
      id: 0,
      url: "",
    },
  }),
  getData,
  create: createEssay,
  update: updateEssay,
  rules: {
    name: [{ required: true, message: "请输入文章名", trigger: "blur" }],
    introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
    content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  },
});
</script>
