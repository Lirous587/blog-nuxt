<template>
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
      <div class="min-h-[700px] flex-1">
        <GalleryMain
          @select-img="handelSelectImg"
          ref="mainRef"
          :kindID="kindID"
          :oID="props.oID"
        ></GalleryMain>
      </div>
    </el-container>
  </el-card>
  <MyDrawer
    :title="drawerData.title"
    direction="rtl"
    ref="drawerRef"
    class="dark:bg-black"
    destroy-on-close
  >
    <div>
      <div v-if="drawerData.type === 'kind'">
        <el-form :model="kindForm" label-width="80px">
          <el-form-item label="分类名称">
            <el-input
              placeholder="请输入分类名称"
              v-model="kindForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handelCreateKind">
              创建分类
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <el-form :model="galleryForm">
          <el-form-item>
            <UploadImg
              ref="uploadRef"
              v-model:imgUrl="galleryForm.url"
            ></UploadImg>
          </el-form-item>
          <el-form-item>
            <el-button class="mt-3" type="primary" @click="handelUpload">
              上传图片
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </MyDrawer>
</template>

<script setup>
import { createGallery } from "~/api/gallery";
import { createGalleryKind } from "~/api/galleryKind";

const asideRef = ref(null);
const mainRef = ref(null);
const uploadRef = ref(null);

const props = defineProps({
  oID: {
    type: Number,
    default: 0,
  },
});

const kindID = ref(1);

const handelChangeKind = (id) => {
  kindID.value = id;
};

const kindForm = reactive({
  name: "",
});

const galleryForm = reactive({
  kindID: kindID.value,
  url: "",
});

const drawerRef = ref(null);

const drawerData = reactive({
  title: "",
  type: "",
});

const handelCreateKindPre = () => {
  drawerData.title = "创建分类";
  drawerData.type = "kind";
  drawerRef.value.open();
};

const handelCreateKind = () => {
  asideRef.value.getList();
  createGalleryKind(kindForm).then(() => {
    asideRef.value.getList();
    toast("创建成功");
    drawerRef.value.close();
  });
};

const handelUploadPre = () => {
  galleryForm.url = "";
  drawerData.title = "上传图片";
  drawerData.type = "img";
  drawerRef.value.open();
};

const handelUpload = () => {
  uploadRef.value.submitUpload();
  galleryForm.kindID = kindID.value;
  createGallery(galleryForm).then(() => {
    mainRef.value.getList();
  });
  drawerRef.value.close();
};

const handelSelectImg = (img) => {
  const retImg = {
    url: img.url,
    id: img.id,
  };
  emits("selectImg", retImg);
};

const emits = defineEmits(["selectImg"]);
</script>
