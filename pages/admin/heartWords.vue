<template>
  <div>
    <el-card>
      <template #header>
        <el-button type="primary" @click="drawerVisiableRef = true"
          >添加</el-button
        >
      </template>
      <el-table :data="list" border v-loading="tableLoading">
        <el-table-column
          label="id"
          prop="id"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column label="心语内容" align="center" min-width="250">
          <template #default="scope">
            <el-input
              placeholder="请输入心语内容"
              v-model="scope.row.content"
              type="textarea"
              :rows="2"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="心语出处" align="center" min-width="250">
          <template #default="scope">
            <el-input
              size="large"
              placeholder="请输入心语出处"
              v-model="scope.row.author"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否打印" align="center" min-width="250">
          <template #default="scope">
            <el-switch v-model="scope.row.ifCouldType" size="large" />
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="icon" align="center" width="180">
          <template #default="scope">
            <el-button
              type="warning"
              :loading="scope.row.loading"
              @click="handelUpdate(scope.row)"
              >修改</el-button
            >

            <el-popconfirm
              title="确定删除该心语?"
              confirm-button-text="确定"
              confirm-button-type="danger"
              cancel-button-text="取消"
              cancel-button-type="primary"
              icon-color="rgb(245,108,108)"
              @confirm="handelDelete(scope.row)"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div class="mt-5 flex justify-center">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-count="currentPage"
            @change="changePage"
          />
        </div>
      </template>
    </el-card>

    <el-drawer
      title="添加标签"
      direction="rtl"
      v-model="drawerVisiableRef"
      size="50%"
      append-to-body
    >
      <el-form :model="form" label-width="80px" :inline="false">
        <el-form-item label="心语内容">
          <el-input
            placeholder="请输入标签名称"
            size="large"
            v-model="form.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="心语出处">
          <el-input
            placeholder="请输入标签介绍"
            v-model="form.author"
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

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="mt-5 w-full"
            @click="handelCreate"
            :loading="loading"
          >
            添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  createHeartWords,
  deleteHeartWords,
  getHeartWordsList,
  updateHeartWords,
} from "~/api/heartWords";

const pageSise = ref(10);

definePageMeta({
  layout: "admin",
});

const form = reactive({
  content: "",
  author: "",
  ifCouldType: false,
});

const currentPage = ref(1);

const queryParams = reactive({
  page: 1,
  pageSize: 10,
});

const drawerVisiableRef = ref(false);

const tableLoading = ref(false);
const loading = ref(false);

const list = ref([]);

const getList = async () => {
  tableLoading.value = true;
  await getHeartWordsList(queryParams)
    .then((res) => {
      const data = res.data;
      currentPage.value = data.totalPage;
      list.value = data.heartWordsList.map((item) => {
        return {
          ...item,
          loading: false,
        };
      });
    })
    .finally(() => {
      tableLoading.value = false;
    });
};

getList();

const handelCreate = () => {
  loading.value = true;
  tableLoading.value = true;
  createHeartWords(form)
    .then(async () => {
      toast("创建成功");
      await getList();
      tableLoading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};

const handelUpdate = (row) => {
  row.loading = true;
  updateHeartWords(row)
    .then(() => {
      toast("修改成功");
    })
    .finally(() => {
      row.loading = false;
    });
};

const handelDelete = (row) => {
  tableLoading.value = true;
  deleteHeartWords(row.id)
    .then(async () => {
      toast("删除成功");
      await getList();
    })
    .finally(() => {
      tableLoading.value = false;
    });
};

const changePage = async (row) => {
  queryParams.page = row;
  await getList();
};
</script>
