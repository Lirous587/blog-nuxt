<template>
  <div>
    <el-card shadow="always">
      <template #header>
        <AdminSearch @search="getData" @reset="resetSearchForm">
          <template #default>
            <el-input
              placeholder="请输入用户名/邮箱"
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
        <el-table-column
          label="id"
          prop="id"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column label="用户名" prop="name" align="center" />
        <el-table-column label="邮箱" prop="email" align="center" />
        <el-table-column label="头像" align="center">
          <template #default="scope">
            <el-avatar :src="imgPre + scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.status" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="status" align="center" width="180">
          <template #default="scope">
            <el-button type="warning" @click="handleEdit(scope.row)"
              >修改
            </el-button>
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
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="请输入名称" v-model="form.name"> </el-input>
        </el-form-item>

        <el-form-item label="介绍" prop="introduction">
          <el-input placeholder="请输入邮箱" v-model="form.email"> </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            type="password"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <ImgSelect v-model:id="form.avatar" :url="form.avatar"></ImgSelect>
        </el-form-item>
      </el-form>
    </MyDrawer>
  </div>
</template>

<script setup>
import { getUserList, createUser, updateUser } from "~/api/user";

definePageMeta({
  layout: "admin",
});

const config = useRuntimeConfig();
const imgPre = config.public.imgAvatarBase;

//  table
const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  pages,
  getData,
} = useInitTable({
  getList: getUserList,
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
    name: "",
    email: "",
    password: "",
    avatar: "",
  }),
  getData,
  create: createUser,
  update: updateUser,
  rules: {
    name: [{ required: true, message: "请输入标签名", trigger: "blur" }],
    introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
  },
});
</script>
