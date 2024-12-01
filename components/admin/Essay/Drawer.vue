<template>
  <MyDrawer ref="drawerRef" :title="title" size="50%" class="dark:bg-black">
    <el-form :model="form" label-width="80px" :inline="false">
      <el-form-item label="分类">
        <AdminSelectKind
          :id="form.kindID"
          :list="kindList"
          @update="handelKindChange"
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
        <ImgPreview @click="chooseImg" :imgUrl="form.img?.url"></ImgPreview>
      </el-form-item>

      <el-form-item label="关键词">
        <DynamicAddTag @tagChange="handelTagChange"></DynamicAddTag>
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
          @click="handelOprate"
          class="mt-5 w-full"
          :loading="loading"
        >
          提交</el-button
        >
      </el-form-item>
    </el-form>
  </MyDrawer>
  <MyDialog title="选择图片" width="80%" ref="dialogRef">
    <Gallery :oID="oID" @select-img="handelSelectImg"></Gallery>
  </MyDialog>
</template>

<script setup>
import { id } from "element-plus/es/locales.mjs";
import { createEssay, updateEssay } from "~/api/essay";
import { useMyAdminStore } from "~/store/admin";

const props = defineProps({
  opration: {
    type: String,
    required: true,
  },
});

const title = computed(() => {
  return props.opration === "create" ? "添加文章" : "修改文章";
});

const form = defineModel("form", {
  required: true,
  type: Object,
});

const loading = ref(false);
const adminStore = useMyAdminStore();

const drawerRef = ref(null);
const dialogRef = ref(null);

const labelList = ref([]);
const kindList = ref([]);

labelList.value = adminStore.getLabelList();
kindList.value = adminStore.getKindList();

const handelKindChange = (value) => {
  form.value.kindID = value;
};

const handelTagChange = (tags) => {
  form.value.keywords = tags.join(",");
};

const handelOprate = () => {
  if (props.opration === "update") {
    handelUpdate();
  } else {
    handelCreate();
  }
};

const handelCreate = () => {
  loading.value = true;
  createEssay(form.value)
    .then(() => {
      toast("添加成功");
      adminStore.updateAll();
    })
    .finally(() => {
      loading.value = false;
      drawerRef.value.open();
    });
};

const handelUpdate = () => {
  loading.value = true;
  updateEssay(form.value)
    .then(() => {
      toast("更新成功");
      form.old_label_ids = form.labelIds;
      adminStore.updateAll();
    })
    .finally(() => {
      loading.value = false;
    });
};

const oID = ref(0);

const handelSelectImgPre = () => {
  dialogRef.value.open();
  oID.value = form.value.img.id;
};

const handelSelectImg = (img) => {
  form.value.img.url = img.imgUrl;
  form.value.img.id = img.id;
  dialogRef.value.close();
};

const chooseImg = () => {
  handelSelectImgPre();
};

const open = () => {
  drawerRef.value.open();
};
const close = () => {
  drawerRef.value.close();
};

defineExpose({
  open,
  close,
});
</script>
