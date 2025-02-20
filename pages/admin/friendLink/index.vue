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
        <el-table-column label="状态" prop="status" align="center">
          <template #default="scope">
            <span class="text-blue-400 dark:text-yellow-400 text-xs">
              {{ getStatus(scope.row.status) }}
            </span>
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
                    @click="handleAuditPre(scope.row.id, true)"
                    >通过</el-button
                  >
                </div>
                <el-button
                  type="warning"
                  size="small"
                  @click="handleAuditPre(scope.row.id, false)"
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
    <MyDialog ref="dialogRef" title="请填写原因" :draggable="true">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="原因" prop="reason">
          <el-input
            type="textarea"
            placeholder="请填写原因"
            v-model="form.reason"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleAudit">提交</el-button>
        </el-form-item>
      </el-form>
    </MyDialog>
  </div>
</template>

<script setup>
import {
  deleteFriendLink,
  getFriendLinkList,
  auditFriendLink,
} from "~/api/friendLink";

definePageMeta({
  layout: "admin",
});

const dialogRef = ref(null);

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

const form = reactive({
  id: 0,
  status: false,
  reason: "",
});

const formRef = ref(null);

const validateReason = (rule, value, callback) => {
  if (ifPass) {
    return callback();
  } else {
    if (value === "") {
      return callback(new Error("请填写拒绝原因"));
    }
    callback();
  }
};

const rules = reactive({
  reason: [
    {
      validator: validateReason,
      trigger: "blur",
    },
  ],
});

const handleAuditPre = (id, status) => {
  form.id = id;
  form.status = status;
  if (ifPass.value) {
    handleAudit();
  } else {
    dialogRef.value.open();
  }
};

const handleAudit = () => {
  auditFriendLink(form.id, form)
    .then((res) => {
      toast("审核成功");
      getData();
    })
    .finally(() => {
      dialogRef.value.close();
    });
};

const ifPass = computed(() => {
  return form.status ? true : false;
});

const getStatus = (status) => {
  if (status === "waitAudit") {
    return "正在审核";
  } else if (status === "accept") {
    return "申请成功";
  } else {
    return "申请失败";
  }
};
</script>
