<template>
  <MyDialog title="选择图片" width="80%" ref="dialogRef">
    <AdminGallery @select="handleSelectImg" />
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

const handleSelectImg = (img) => {
  const imgUrl = imgPre + img.url;
  dialogRef.value.close();
  emits("chooseGalley", imgUrl);
};
</script>
