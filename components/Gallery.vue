<template>
  <el-card>
    <template #header>
      <MyButton type="success" size="small" @click="handelUploadPre"
        >上传图片</MyButton
      >
      <MyButton type="primary" size="small" @click="handelCreateKindPre"
        >创建分类</MyButton
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
        <MyForm :model="kindForm" label-width="80px">
          <MyFormItem label="分类名称">
            <MyInput
              placeholder="请输入分类名称"
              v-model="kindForm.name"
            ></MyInput>
          </MyFormItem>
          <MyFormItem>
            <MyButton type="primary" @click="handelCreateKind">
              创建分类
            </MyButton>
          </MyFormItem>
        </MyForm>
      </div>
      <div v-else>
        <MyForm :model="galleryForm">
          <MyFormItem>
            <UploadImg
              ref="uploadRef"
              v-model:imgUrl="galleryForm.imgUrl"
            ></UploadImg>
          </MyFormItem>
          <MyFormItem>
            <MyButton class="mt-3" type="primary" @click="handelUpload">
              上传图片
            </MyButton>
          </MyFormItem>
        </MyForm>
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
  imgUrl: "",
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
  galleryForm.imgUrl = "";
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
  emits("selectImg", img);
};

const emits = defineEmits(["selectImg"]);
</script>
