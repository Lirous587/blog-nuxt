<template>
  <div>
    <el-card shadow="always">
      <template #header>
        <AdminSearch @search="getData" @reset="resetSearchForm">
          <template #default>
            <el-input
              placeholder="请输入关键词"
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
        <el-table-column label="内容" prop="content" align="center">
        </el-table-column>
        <el-table-column label="出处" prop="source" align="center">
        </el-table-column>

        <el-table-column label="图片" align="center">
          <template #default="scope">
            <el-avatar :src="imgPre + scope.row.img.url"></el-avatar>
          </template>
        </el-table-column>

        <el-table-column label="是否打印" align="center">
          <template #default="scope">
            <el-switch disabled v-model="scope.row.ifCouldType" />
          </template>
        </el-table-column>
        <el-table-column label="是否推荐" align="center">
          <template #default="scope">
            <el-switch disabled v-model="scope.row.ifRecommend" />
          </template>
        </el-table-column>
        <el-table-column label="是否置顶" align="center">
          <template #default="scope">
            <el-switch disabled v-model="scope.row.ifTop" />
          </template>
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
            :total="pages"
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
        <el-form-item label="内容" prop="content">
          <el-input
            placeholder="请输入心语内容"
            size="large"
            v-model="form.content"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="出处">
          <el-input
            placeholder="请输入心语出处"
            v-model="form.source"
            type="textarea"
            :rows="3"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="是否打印">
          <el-radio-group v-model="form.ifCouldType">
            <el-radio :value="true" size="large">是</el-radio>
            <el-radio :value="false" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-radio-group v-model="form.ifRecommend">
            <el-radio :value="true" size="large">是</el-radio>
            <el-radio :value="false" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否置顶">
          <el-radio-group v-model="form.ifTop">
            <el-radio :value="true" size="large">是</el-radio>
            <el-radio :value="false" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片">
          <ImgSelect v-model:id="form.img.id" :url="form.img.url"></ImgSelect>
        </el-form-item>
      </el-form>
    </MyDrawer>
  </div>
</template>

<script setup>
import {
  createHeartWords,
  deleteHeartWords,
  getHeartWordsList,
  updateHeartWords,
} from "~/api/heartWords";

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
  handelDelete,
} = useInitTable({
  getList: getHeartWordsList,
  delete: deleteHeartWords,
  searchForm: reactive({
    page: 1,
    limit: 5,
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
    id: 0,
    content: "",
    source: "",
    img: {
      id: 0,
      url: "",
    },
    ifCouldType: false,
    ifRecommend: false,
    ifTop: false,
  }),
  getData,
  create: createHeartWords,
  update: updateHeartWords,
});
</script>
