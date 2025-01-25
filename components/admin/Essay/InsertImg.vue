<template>
  <MyDialog title="选择图片" width="80%" ref="dialogRef">
    <AdminGallery @select="handelSelectImg" />
  </MyDialog>

  <el-button type="success" @click="chooseGallery"> 选择图片 </el-button>
</template>

<script setup>
const dialogRef = ref(null);
const chooseGallery = () => {
  dialogRef.value.open();
};

const imgPre = useRuntimeConfig().public.imgGalleryBase;

const emits = defineEmits(["chooseGalley"]);

const handelSelectImg = (img) => {
  const imgUrl = imgPre + img.imgUrl;
  dialogRef.value.close();
  emits("chooseGalley", imgUrl);
};
</script>
