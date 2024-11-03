<template>
  <div>
    <el-card>
      <template #header>
        <el-button type="success" size="small" @click="handelUploadPre"
          >上传图片</el-button
        >
        <el-button type="primary" size="small" @click="handelCreateKindPre"
          >创建分类</el-button
        >
      </template>
      <el-container>
        <el-aside width="180px">
          <GalleryAside ref="asideRef" @changeKind="handelChangeKind" />
        </el-aside>
        <div class="h-[700px]">
          <GalleryMain :kindID="kindID"></GalleryMain>
        </div>
      </el-container>
    </el-card>
    <el-drawer
      :title="drawerData.title"
      direction="rtl"
      show-close
      v-model="drawerVisible"
      destroy-on-close
    >
      <div v-if="drawerData.type === 'kind'">
        <el-form :model="form" label-width="80px">
          <el-form-item label="分类名称">
            <el-input
              placeholder="请输入分类名称"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handelCreateKind">
              创建分类
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { createGalleryKind } from "~/api/galleryKind";

const asideRef = ref(null);

const kindID = ref(1);

const handelChangeKind = (id) => {
  kindID.value = id;
};

const form = reactive({
  name: "",
});

const drawerVisible = ref(false);

const drawerData = reactive({
  title: "",
  type: "",
});

const handelCreateKindPre = () => {
  drawerData.title = "创建分类";
  drawerData.type = "kind";
  drawerVisible.value = true;
};

const handelCreateKind = () => {
  asideRef.value.getList();
  createGalleryKind(form).then(() => {
    asideRef.value.getList();
    toast("创建成功");
    drawerVisible.value = false;
  });
};

const handelUploadPre = () => {
  drawerData.title = "上传图片";
  drawerData.type = "img";
  drawerVisible.value = true;
};
</script>

<style scoped>
:deep(.el-card__body) {
  padding: 0 !important;
}
</style>
