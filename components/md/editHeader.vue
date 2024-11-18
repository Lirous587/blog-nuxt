<template>
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
                <el-button link type="primary" size="small">删除文章</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-dialog>

  <el-dialog title="选择图片" width="80%" align-center v-model="dialogVisiable">
    <Gallery @select-img="handelSelectImg"></Gallery>
  </el-dialog>

  <div>
    <el-button type="success" @click="dialogVisibleSearch = true">
      <el-icon size="18" class="mr-2">
        <Search />
      </el-icon>
      搜索文章
    </el-button>
    <el-button type="primary" class="m-1" @click="chooseGallery">
      选择图片
    </el-button>
  </div>
</template>

<script lang="ts" setup>
const dialogVisiable = ref(false);

const chooseGallery = () => {
  dialogVisiable.value = true;
};

const imgPre = useRuntimeConfig().public.imgBase + "/";

const handelSelectImg = (img) => {
  const imgUrl = imgPre + img.url;
  editorRef.value?.insert(() => {
    return {
      targetValue: `\n![](${imgUrl})\n`,
      select: false,
      deviationStart: 0,
      deviationEnd: 0,
    };
  });
  dialogVisiable.value = false;
};
</script>

<style></style>
