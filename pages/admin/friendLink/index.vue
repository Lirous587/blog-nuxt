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
        <el-table-column label="操作" align="center" width="140">
          <template #default="scope">
            <div class="flex justify-around items-center gap-x-4">
              <span
                v-if="scope.row.ifAudit"
                class="text-blue-400 dark:text-pink-400 text-xs"
              >
                已审核
              </span>
              <div v-else class="flex flex-col gap-y-2">
                <div>
                  <el-button
                    type="warning"
                    size="small"
                    @click="handleChangeStatus(scope.row, true)"
                    >通过</el-button
                  >
                </div>
                <el-button
                  type="warning"
                  size="small"
                  @click="handleChangeStatus(scope.row, false)"
                  >拒绝</el-button
                >
              </div>
              <div class="ml-auto">
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
              </div>
            </div>
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
  deleteFriendLink,
  getFriendLinkList,
  changeFriendLinkStatus,
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
  handleChangeStatus,
} = useInitTable({
  getList: getFriendLinkList,
  delete: deleteFriendLink,
  changeStatus: changeFriendLinkStatus,
  searchForm: reactive({
    page: 1,
    limit: 10,
    keyword: "",
  }),
});
</script>
