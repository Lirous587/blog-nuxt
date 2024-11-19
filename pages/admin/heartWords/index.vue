<template>
  <div>
    <el-card>
      <template #header>
        <el-button type="primary" @click="handelCreatePre">添加</el-button>
      </template>
      <el-table :data="list" border v-loading="tableLoading">
        <el-table-column
          label="id"
          prop="id"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          label="心语内容"
          prop="content"
          align="center"
          min-width="250"
        >
        </el-table-column>
        <el-table-column
          label="心语出处"
          prop="source"
          align="center"
          min-width="250"
        >
        </el-table-column>

        <el-table-column label="心语图片" align="center" min-width="250">
          <template #default="scope">
            <el-avatar :src="imgPre + scope.row.img.url"></el-avatar>
          </template>
        </el-table-column>

        <el-table-column label="是否打印" align="center" min-width="250">
          <template #default="scope">
            <el-switch disabled v-model="scope.row.ifCouldType" size="large" />
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="icon" align="center" width="180">
          <template #default="scope">
            <el-button
              type="warning"
              :loading="scope.row.loading"
              @click="handelUpdatePre(scope.row)"
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
        <el-form-item label="图片">
          <ImgPreview
            @click="dialogRef.open()"
            :imgUrl="form.img?.url"
          ></ImgPreview>
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

    <MyDialog title="选择图片" width="80%" ref="dialogRef">
      <Gallery :oID="oID" @select-img="handelSelectImg"></Gallery>
    </MyDialog>
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
const imgPre = config.public.imgBase + "/";

provide("select", true);

const dialogRef = ref(null);

const oldForm = reactive({
  id: 1,
  content: "",
  source: "",
  img: {
    url: "",
    id: 0,
  },
  ifCouldType: false,
});

const form = reactive({
  id: 1,
  content: "",
  source: "",
  img: {
    url: "",
    id: 0,
  },
  ifCouldType: false,
});

const currentPage = ref(1);

const queryParams = reactive({
  page: 1,
  pageSize: 10,
});

const drawerRef = ref(null);
const ifCreate = ref(true);

const tableLoading = ref(false);
const loading = ref(false);

const list = ref([]);

const getList = async () => {
  tableLoading.value = true;
  await getHeartWordsList(queryParams)
    .then((res) => {
      const data = res.data;
      currentPage.value = data.totalPage;
      list.value = data.list.map((item) => {
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

await getList();

const drawerAction = async () => {
  ifCreate.value ? handelCreate() : handelUpdate();
};

const cleanForm = () => {
  for (const key in oldForm) {
    form[key] = oldForm[key];
  }
};

const handelCreatePre = () => {
  cleanForm();
  drawerRef.value.open();
  ifCreate.value = true;
};

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
      drawerRef.value.close();
    });
};

const handelUpdatePre = (row) => {
  cleanForm();
  for (const key in form) {
    form[key] = row[key];
  }

  oID.value = form.img.id;

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

const oID = ref(0);

const handelSelectImg = (img) => {
  form.img = img;
  dialogVisible.value.close();
};
</script>
