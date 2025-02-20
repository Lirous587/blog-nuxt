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
      </template>
      <el-table stripe :data="tableData" v-loading="loading">
        <el-table-column
          label="id"
          prop="id"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          label="网站名"
          prop="siteName"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column label="logo" prop="logo" align="center">
          <template #default="scope">
            <el-avatar :src="scope.row.logo"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          label="地址"
          prop="url"
          align="center"
          show-overflow-tooltip
        >
          <template #default="scope">
            <el-link type="primary" :href="scope.row.url" target="_blank">
              {{ scope.row.url }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="介绍"
          prop="introduction"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column label="状态" align="center" show-overflow-tooltip>
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="true"
              :inactive-value="false"
              disabled
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="280">
          <template #default="scope">
            <el-button type="warning" size="small">通过 </el-button>
            <el-button type="warning" size="small">拒绝 </el-button>
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
                <el-button type="danger" size="small">删除 </el-button>
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
  </div>
</template>

<script setup>
import {
  createFriendLink,
  deleteFriendLink,
  getFriendLinkList,
  updateFriendLink,
} from "~/api/friendLink";

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
  getList: getFriendLinkList,
  delete: deleteFriendLink,
  searchForm: reactive({
    page: 1,
    limit: 10,
    keyword: "",
  }),
});

// form
const { drawerRef, form, formRef, drawerTitle, handleSubmit, rules } =
  useInitForm({
    form: reactive({
      id: "",
      siteName: "",
      url: "",
      introduction: "",
      logo: "",
      uid: 0,
    }),
    getData,
    create: createFriendLink,
    update: updateFriendLink,
  });
</script>
