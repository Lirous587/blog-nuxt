<template>
  <div>
    <el-card shadow="hover">
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
        <el-table-column label="操作" align="center" width="180">
          <template #default="scope">
            <el-popconfirm
              title="确定下线该用户?"
              confirm-button-text="确定"
              confirm-button-type="danger"
              cancel-button-text="取消"
              cancel-button-type="primary"
              @confirm="handleDownLine(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger"> 下线 </el-button>
              </template>
            </el-popconfirm>

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
        <el-form-item label="头像" prop="imgData">
          <ImgUpload v-model:imgData="form.imgData" size-limit="3MB">
            <template #default>
              <el-avatar size="large" :src="imgPre + form.avatar"></el-avatar>
              <br />
              <small>请上传图片,内容大小不得超过2MB</small>
            </template>
            <template #preview="previewProps">
              <el-avatar
                size="large"
                :src="previewProps.previewUrl"
              ></el-avatar>
            </template>
          </ImgUpload>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="请输入名称" v-model="form.name"> </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
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
        <el-form-item label="状态" prop="password">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>
    </MyDrawer>
  </div>
</template>

<script setup>
import { getUserList, createUser, updateUser, downLine } from "~/api/user";

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
    imgData: null,
    name: "",
    email: "",
    password: "",
    avatar: "",
    id: "",
    status: false,
  }),
  getData,
  create: createUser,
  update: updateUser,
  rules: {
    imgData: [
      {
        required: false,
        message: "请上传图片,内容大小不得超过2MB",
        trigger: "blur",
      },
    ],
    name: [
      {
        required: true,
        message: "请输入昵称,宽度应在2-15之间",
        trigger: "blur",
        min: 2,
        max: 15,
      },
    ],
    email: [
      {
        required: true,
        message: "请输入邮箱地址",
        trigger: "blur",
        type: "email",
      },
    ],
    password: [
      {
        required: false,
        message: "密码长度应在6-30之间",
        trigger: "blur",
        min: 6,
        max: 30,
      },
    ],
  },
  berforSubmit: (form) => {
    const formData = new FormData();
    formData.append("img", form.imgData);
    formData.append("info", JSON.stringify({ ...form, imgData: undefined }));
    return formData;
  },
});

const handleDownLine = (id) => {
  downLine(id).then((res) => {
    toast("下线成功");
  });
};
</script>
