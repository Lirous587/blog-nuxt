<template>
  <div>
    <el-card shadow="always">
      <template #header>
        <AdminSearch @search="getData" @reset="resetSearchForm">
          <template #default>
            <el-input
              placeholder="关键词"
              v-model="searchForm.keyword"
              @keydown.enter="getData"
            ></el-input>
          </template>
        </AdminSearch>
        <el-button type="primary" @click="handelCreatePre" size="small"
          >添加
        </el-button>
      </template>

      <el-table :data="list" border v-loading="tableLoading">
        <el-table-column
          label="id"
          prop="id"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column label="心语内容" prop="content" align="center">
        </el-table-column>
        <el-table-column label="心语出处" prop="source" align="center">
        </el-table-column>

        <el-table-column label="心语图片" align="center">
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
            <el-button
              type="warning"
              :loading="scope.row.loading"
              @click="handelUpdatePre(scope.row)"
              >修改
            </el-button>

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
            layout="prev, pager, next"
            :page-count="totalPages"
            @change="changePage"
          />
        </div>
      </template>
    </el-card>

    <MyDrawer
      :title="ifCreate ? '添加心语' : '修改心语'"
      direction="rtl"
      ref="drawerRef"
      size="50%"
      :destroy-on-close="true"
      class="dark:bg-black"
    >
      <el-form :model="form" label-width="80px" :inline="false">
        <el-form-item label="心语内容" prop="content">
          <el-input
            placeholder="请输入心语内容"
            size="large"
            v-model="form.content"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="心语出处">
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
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="mt-5 w-full"
            @click="drawerAction"
            :loading="loading"
          >
            {{ ifCreate ? "添加心语" : "修改心语" }}
          </el-button>
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
const imgPre = config.public.imgGalleryBase + "/";

const form = reactive({
  id: 1,
  content: "",
  source: "",
  img: {
    id: 0,
    url: "",
  },
  ifCouldType: false,
  ifRecommend: false,
  ifTop: false,
});

const searchForm = reactive({
  page: 1,
  pageSize: 10,
  keyword: "",
});

const drawerRef = ref(null);

const ifCreate = ref(true);

const tableLoading = ref(false);
const loading = ref(false);

const list = ref([]);

const totalPages = ref(1);

const changePage = async (page) => {
  searchForm.page = page;
  await getData();
};

const getData = async () => {
  tableLoading.value = true;
  await getHeartWordsList(searchForm)
    .then((res) => {
      const data = res.data;
      totalPages.value = data.totalPages;
      if (Array.isArray(data.list)) {
        list.value = data.list.map((item) => {
          return {
            ...item,
            loading: false,
          };
        });
      }
    })
    .finally(() => {
      tableLoading.value = false;
    });
};

await getData();

const drawerAction = async () => {
  ifCreate.value ? handelCreate() : handelUpdate();
};

const handelCreatePre = () => {
  resetForm(form);
  drawerRef.value.open();
  ifCreate.value = true;
};

const handelCreate = () => {
  loading.value = true;
  tableLoading.value = true;
  createHeartWords(form)
    .then(async () => {
      toast("创建成功");
      await getData();
      tableLoading.value = false;
    })
    .finally(() => {
      loading.value = false;
      drawerRef.value.close();
    });
};

const handelUpdatePre = (row) => {
  resetForm(form);
  for (const key in form) {
    form[key] = row[key];
  }

  drawerRef.value.open();

  ifCreate.value = false;
};

const handelUpdate = () => {
  updateHeartWords(form)
    .then(async () => {
      toast("修改成功");
      let item = list.value.find((item) => item.id === form.id);
      for (const key in item) {
        item[key] = form[key];
      }
    })
    .finally(() => {
      drawerRef.value.close();
    });
};

const handelDelete = (row) => {
  tableLoading.value = true;
  deleteHeartWords(row.id)
    .then(async () => {
      toast("删除成功");
      await getData();
    })
    .finally(() => {
      tableLoading.value = false;
    });
};

const resetSearchForm = () => {
  resetForm(searchForm);
  getData();
};
</script>
