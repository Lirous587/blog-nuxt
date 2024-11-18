<template>
  <!-- 选择图片 -->
  <el-dialog
    title="选择图片"
    width="80%"
    align-center
    v-model="dialogVisiableForGallery"
  >
    <Gallery @select-img="handelSelectImg"></Gallery>
  </el-dialog>

  <div>
    <el-button type="success" @click="chooseGallery"> 选择图片 </el-button>
  </div>
</template>

<script setup>
const dialogVisiableForGallery = ref(false);
const chooseGallery = () => {
  dialogVisiableForGallery.value = true;
};

const imgPre = useRuntimeConfig().public.imgBase + "/";

const emits = defineEmits(["chooseGalley", "chooseEssay"]);

const handelSelectImg = (img) => {
  const imgUrl = imgPre + img.url;
  dialogVisiableForGallery.value = false;
  emits("chooseGalley", imgUrl);
};
</script>
