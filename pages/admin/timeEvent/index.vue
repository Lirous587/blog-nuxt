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
        <el-table-column label="图片" align="center">
          <template #default="scope">
            <el-avatar :src="imgPre + scope.row.img.url"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="链接" align="center">
          <template #default="scope">
            <el-text v-if="!scope.row.relatedLink" type="info">无</el-text>
            <el-link
              v-else
              type="info"
              :href="scope.row.relatedLink"
              target="_blank"
            >
              相关链接
            </el-link>
          </template>
        </el-table-column>
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
          <el-input placeholder="请输入主题" v-model="form.topic"> </el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input
            placeholder="请输入介绍"
            v-model="form.introduction"
            type="textarea"
            :rows="3"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="相关链接" prop="relatedLink">
          <el-input
            placeholder="请输入相关链接（可选）"
            v-model="form.relatedLink"
            type="url"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <ImgSelect v-model:id="form.img.id" :url="form.img.url"></ImgSelect>
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
    relatedLink: "",
    img: {
      id: 0,
      url: "",
    },
  }),
  getData,
  create: createTimeEvent,
  update: updateTimeEvent,
  rules: {
    topic: [{ required: true, message: "请输入主题", trigger: "blur" }],
    introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
    img: [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!value.id) {
            callback(new Error("请选择图片"));
          } else {
            callback();
          }
        },
        trigger: "blur",
      },
    ],
  },
});
</script>
