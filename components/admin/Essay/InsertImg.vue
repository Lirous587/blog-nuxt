<template>
  <MyDialog title="选择图片" width="80%" ref="dialogRef">
    <Gallery @select-img="handelSelectImg"></Gallery>
  </MyDialog>

  <el-button type="success" @click="chooseGallery"> 选择图片 </el-button>
</template>

<script setup>
const dialogRef = ref(null);
const chooseGallery = () => {
  dialogRef.value.open();
};

const imgPre = useRuntimeConfig().public.imgBase + "/";

const emits = defineEmits(["chooseGalley", "chooseEssay"]);

const handelSelectImg = (img) => {
  const imgUrl = imgPre + img.url;
  dialogRef.value.close();
  emits("chooseGalley", imgUrl);
};
</script>
