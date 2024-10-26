<template>
  <el-drawer
    v-model="drawerVisiableRef"
    title="添加文章"
    append-to-body
    size="50%"
  >
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
        <AdminUploadImg
          v-model:imgUrl="form.imgUrl"
          ref="uploadImgRef"
        ></AdminUploadImg>
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
          style="width: 100%"
          @click="handelCreate"
          class="mt-5"
        >
          添加</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>

  <div class="mx-3 my-3">
    <Md v-model:content="form.content" mode="edit"></Md>
  </div>

  <!-- 底部按钮 -->
  <div class="bottom-3 fixed" style="z-index: 999">
    <el-button
      type="primary"
      size="large"
      @click="drawerVisiableRef = true"
      class="ml-3"
      >添加文章</el-button
    >
  </div>
</template>

<script setup>
import { createEssay } from "~/api/manager.js";
import { useMyAdminStore } from "~/store/admin";

definePageMeta({
  layout: "admin",
});

const uploadImgRef = ref(null);

const adminStore = useMyAdminStore();
await adminStore.updateAll();

const labelList = ref([]);
const kindList = ref([]);
labelList.value = adminStore.getLabelList();
kindList.value = adminStore.getKindList();

const form = reactive({
  name: "新文章",
  kindID: null,
  labelIds: [],
  introduction: "",
  content: "",
  imgUrl: "7.png",
  ifTop: false,
  ifRecommend: false,
  keywords: [],
});
const drawerVisiableRef = ref(false);
const handelCreate = () => {
  createEssay(form);
};
</script>
