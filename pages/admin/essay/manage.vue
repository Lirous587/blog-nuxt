<template>
  <div class="mx-3 my-3">
    <!-- 查询结果 -->

    <MyDialog ref="dialogRef" title="Tips" width="80%">
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
    </MyDialog>

    <AdminEssayDrawer
      v-model:form="form"
      title="修改文章"
      ref="drawerRef"
      opration="update"
    ></AdminEssayDrawer>

    <el-card>
      <template #header>
        <div class="flex gap-x-2">
          <el-button type="info" @click="dialogRef.open()">
            <el-icon size="18" class="mr-2">
              <Search />
            </el-icon>
            搜索文章
          </el-button>
          <el-button type="primary" @click="updatePreHandel" class="ml-3"
            >修改文章</el-button
          >
          <AdminEssayInsertImg
            @choose-galley="chooseGalleyHandel"
          ></AdminEssayInsertImg>
        </div>
      </template>
      <MdEdit ref="mdEditRef" v-model:content="form.content"></MdEdit>
    </el-card>
  </div>
</template>

<script setup>
import { getEssay } from "~/api/essay";
import { searchEssay } from "~/api/keyword";
import { deleteEssay } from "~/api/essay";

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

const dialogRef = ref(null);
const drawerRef = ref(null);

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

const hasChooseEssay = ref(false);

const chooseEssayHandel = async (row) => {
  hasChooseEssay.value = true;
  loading.value = true;
  for (const key in form) {
    if (row[key]) {
      form[key] = row[key];
    }
  }
  await getEssay(row.id)
    .then((res) => {
      const data = res.data;
      for (const key in form) {
        if (data[key]) {
          form[key] = data[key];
        }
      }
      if (Array.isArray(data.label_list)) {
        form.labelIds = data.label_List.map((o) => o.id);
        form.oldLabelIds = form.labelIds;
      }
    })
    .finally(() => {
      loading.value = false;
      dialogRef.value.close();
    });
};

const updatePreHandel = () => {
  if (!hasChooseEssay.value) {
    return toast("请先选择文章", "warning");
  }
  drawerRef.value.open();
};

const handelDeleteEssay = (row) => {
  tableLoading.value = true;
  deleteEssay(row.id)
    .then(() => {
      toast("删除成功");
      handelSearchEssay();
    })
    .finally(() => {
      tableLoading.value = false;
    });
};

const mdEditRef = ref(null);

const chooseGalleyHandel = (imgUrl) => {
  const insertValue = `\n![图片信息](${imgUrl})\n`;
  mdEditRef.value.editorRef.insert(() => {
    return {
      targetValue: insertValue,
      select: false,
      deviationStart: 0,
      deviationEnd: 0,
    };
  });
};
</script>
