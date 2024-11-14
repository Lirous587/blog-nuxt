<template>
  <div>
    <el-dialog v-model="dialogVisibleSearch" title="Tips" width="80%">
      <template #header>
        <h4 class="font-bold">查询文章</h4>
      </template>

      <el-card>
        <template #header>
          <el-input
            placeholder="输入文章名称或关键词"
            v-model="searchForm.keyword"
            @keydown.enter="handelSearchEssay"
            :autofocus="true"
            size="large"
          >
            <template #suffix>
              <el-button type="primary" @click="handelSearchEssay">
                <el-icon size="18" class="mr-2">
                  <Search />
                </el-icon>
                搜索文章
              </el-button>
            </template>
          </el-input>
        </template>
        <el-table
          :data="essayList"
          v-loading="tableLoading"
          border
          stripe
          size="large"
        >
          <el-table-column
            label="id"
            prop="id"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            label="文章名"
            prop="name"
            align="center"
            min-width="120"
          />
          <el-table-column
            label="介绍"
            prop="introduction"
            align="center"
            min-width="240"
            class="break-words"
          />
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            min-width="200"
          >
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="chooseEssayHandel(scope.row)"
                :loading="loading"
              >
                选择文章
              </el-button>
              <el-popconfirm
                title="确定删除该文章?"
                confirm-button-text="确定"
                confirm-button-type="danger"
                cancel-button-text="取消"
                cancel-button-type="primary"
                icon-color="rgb(245,108,108)"
                @confirm="handelDeleteEssay(scope.row)"
              >
                <template #reference>
                  <el-button link type="primary" size="small"
                    >删除文章</el-button
                  >
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-dialog>

    <el-drawer v-model="drawerVisiableRef" title="修改文章" size="50%">
      <el-form :model="form" label-width="80px" :inline="false">
        <el-form-item label="分类">
          <AdminSelectKind
            v-model:kindID="form.kindID"
            :list="kindList"
          ></AdminSelectKind>
        </el-form-item>

        <el-form-item label="标签">
          <AdminSelectLabels
            :list="labelList"
            v-model:ids="form.labelIds"
          ></AdminSelectLabels>
        </el-form-item>

        <el-form-item label="文章名">
          <el-input v-model="form.name" placeholder="文章名" />
        </el-form-item>

        <el-form-item label="介绍">
          <el-input
            v-model="form.introduction"
            placeholder="介绍"
            class="input"
          />
        </el-form-item>

        <el-form-item label="文章图片">
          <ImgPreview
            @click="handelSelectImgPre"
            :imgUrl="form.img?.url"
          ></ImgPreview>
        </el-form-item>

        <el-form-item label="关键词">
          <DynamicAddTag v-model:tags="form.keywords"> </DynamicAddTag>
        </el-form-item>

        <el-form-item label="是否置顶">
          <el-radio-group v-model="form.ifTop">
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

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            @click="handelUpdate"
            class="mt-5 w-full"
            :loading="loading"
          >
            修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-card>
      <template #header>
        <el-button type="success" @click="dialogVisibleSearch = true">
          <el-icon size="18" class="mr-2">
            <Search />
          </el-icon>
          搜索文章
        </el-button>
      </template>
      <MdEdit v-model:content="form.content"></MdEdit>
    </el-card>

    <div class="bottom-3 fixed z-20">
      <el-button
        type="primary"
        size="large"
        @click="updatePreHandel"
        class="ml-3"
        >修改文章</el-button
      >
    </div>

    <el-dialog
      title="选择图片"
      width="80%"
      align-center
      v-model="dialogVisibleImg"
    >
      <Gallery :oID="oID" @select-img="handelSelectImg"></Gallery>
    </el-dialog>
  </div>
</template>

<script setup>
import { getEssay } from "~/api/essay";
import { searchEssay } from "~/api/keyword";
import { deleteEssay, updateEssay } from "~/api/essay";
import { useMyAdminStore } from "~/store/admin";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

provide("select", true);

const form = reactive({
  id: 0,
  name: "",
  kindID: null,
  oldLabelIds: [],
  labelIds: [],
  introduction: "",
  content: "",
  img: {
    url: "",
    id: "",
  },
  ifTop: false,
  ifRecommend: false,
  keywords: [],
});

const loading = ref(false);
const tableLoading = ref(false);

const dialogVisibleSearch = ref(false);
const dialogVisibleImg = ref(false);
const drawerVisiableRef = ref(false);

// 查询文章
const essayList = ref([]);

const searchForm = reactive({
  keyword: "",
  ifAdd: false,
});

const handelSearchEssay = async () => {
  tableLoading.value = true;
  await searchEssay(searchForm).then((res) => {
    essayList.value = res.data;
    tableLoading.value = false;
  });
};

const adminStore = useMyAdminStore();
const labelList = ref([]);
const kindList = ref([]);
labelList.value = adminStore.getLabelList();
kindList.value = adminStore.getKindList();

const hasChooseEssay = ref(false);

const chooseEssayHandel = (row) => {
  hasChooseEssay.value = true;
  loading.value = true;
  for (const key in form) {
    if (row[key]) {
      form[key] = row[key];
    }
  }
  getEssay(row.id)
    .then((res) => {
      const data = res.data;
      for (const key in form) {
        if (data[key]) {
          form[key] = data[key];
        }
      }
      if (Array.isArray(data.labelList)) {
        form.labelIds = data.labelList.map((o) => o.id);
        form.oldLabelIds = form.labelIds;
      }
    })
    .finally(() => {
      loading.value = false;
      dialogVisibleSearch.value = false;
    });
};

const updatePreHandel = () => {
  if (!hasChooseEssay.value) {
    return toast("请先选择文章", "warning");
  }

  drawerVisiableRef.value = true;
};

const handelUpdate = () => {
  loading.value = true;
  updateEssay(form)
    .then(() => {
      toast("更新成功");
      form.oldLabelIds = form.labelIds;
      adminStore.updateAll();
    })
    .finally(() => {
      loading.value = false;
    });
};

const handelDeleteEssay = (row) => {
  tableLoading.value = true;
  deleteEssay(row.id)
    .then(() => {
      toast("删除成功");
      handelSearchEssay();
      adminStore.updateAll();
    })
    .finally(() => {
      tableLoading.value = false;
    });
};

const oID = ref(0);

const handelSelectImgPre = () => {
  dialogVisibleImg.value = true;
  oID.value = form.img.id;
};

const handelSelectImg = (img) => {
  form.img = img;
  dialogVisibleImg.value = false;
};
</script>
