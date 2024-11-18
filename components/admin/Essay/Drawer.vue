<template>
  <el-drawer
    v-model="drawerVisiable"
    title="添加文章"
    size="50%"
    class="dark:bg-black"
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
        <ImgPreview
          @click="dialogVisiable = true"
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
          @click="handelCreate"
          class="mt-5 w-full"
          :loading="loading"
        >
          添加</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>

  <el-dialog title="选择图片" width="80%" align-center v-model="dialogVisiable">
    <Gallery @select-img="handelSelectImg"></Gallery>
  </el-dialog>
</template>

<script setup>
import { createEssay } from "~/api/essay";
import { useMyAdminStore } from "~/store/admin";

const drawerVisiable = defineModel("drawerVisiable", {
  required: true,
  type: Boolean,
});

const form = defineModel("form", {
  required: true,
  type: Object,
});

const loading = ref(false);
const adminStore = useMyAdminStore();

const dialogVisiable = ref(false);

const labelList = ref([]);
const kindList = ref([]);

labelList.value = adminStore.getLabelList();
kindList.value = adminStore.getKindList();

const handelCreate = () => {
  loading.value = true;
  createEssay(form.value)
    .then(() => {
      toast("添加成功");
      adminStore.updateAll();
    })
    .finally(() => {
      loading.value = false;
      drawerVisiable.value = false;
    });
};

const handelSelectImg = (img) => {
  form.value.img = img;
  dialogVisiable.value = false;
};
</script>
