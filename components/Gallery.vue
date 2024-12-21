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
            <UploadImg v-model:imgData="galleryForm.imgData">
              <template #default>
                <div
                  class="w-[200px] h-[200px] flex items-center justify-center border rounded-md bg-red-50"
                >
                  <el-icon><Plus /></el-icon>
                </div>
              </template>
              <template #preview="previewProps">
                <div
                  class="w-[200px] h-[200px] flex items-center justify-center border rounded-md bg-red-50"
                >
                  <el-image
                    v-if="previewProps.previewUrl"
                    :src="previewProps.previewUrl"
                  />
                  <el-icon v-else><Plus /></el-icon>
                </div>
              </template>
            </UploadImg>
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
  imgData: null,
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
  drawerData.title = "上传图片";
  drawerData.type = "img";
  drawerRef.value.open();
};

const handelUpload = async () => {
  galleryForm.kindID = kindID.value;
  const formData = new FormData();
  formData.append("img", galleryForm.imgData);
  console.log(galleryForm.imgData);
  formData.append(
    "info",
    JSON.stringify({ ...galleryForm, imgData: undefined })
  );
  await createGallery(formData).then(() => {
    mainRef.value.getList();
  });
  drawerRef.value.close();
};

const handelSelectImg = (img) => {
  emits("selectImg", img);
};

const emits = defineEmits(["selectImg"]);
</script>
