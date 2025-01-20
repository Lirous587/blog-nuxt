<template>
  <MyDialog title="选择图片" width="80%" ref="dialogRef">
    <AdminGallery @select-img="handelSelectImg" />
  </MyDialog>
  <div
    @click="dialogRef.open"
    class="w-[200px] h-[200px] flex items-center justify-center overflow-hidden border rounded-md bg-red-50"
  >
    <div v-if="!!imgID || !!url">
      <el-image :src="imgPre + url" fit="contain" />
    </div>
    <div v-else>
      <el-icon><Plus /></el-icon>
    </div>
  </div>
</template>

<script setup>
provide("select", true);
const imgPre = useRuntimeConfig().public.imgGalleryBase + "/";
const imgID = defineModel("id", {
  type: Number,
  required: true,
});
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
});

const dialogRef = ref(null);

const handelSelectImg = (img) => {
  imgID.value = img.id;
  props.url = img.imgUrl;
  dialogRef.value.close();
};
</script>
