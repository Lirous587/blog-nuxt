<template>
  <MyDialog title="选择图片" width="80%" ref="dialogRef">
    <AdminGallery @select="handleSelectImg" />
  </MyDialog>
  <div
    @click="dialogRef.open"
    class="w-[200px] h-[200px] flex items-center justify-center overflow-hidden border rounded-md bg-red-50"
  >
    <div v-if="previewUrl || url">
      <el-image :src="imgPre + (previewUrl ? previewUrl : url)" fit="contain" />
    </div>
    <div v-else>
      <el-icon><Plus /></el-icon>
    </div>
  </div>
</template>

<script setup>
provide("select", true);
const imgPre = useRuntimeConfig().public.imgGalleryBase;
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

const previewUrl = ref("");

const dialogRef = ref(null);

const handleSelectImg = (img) => {
  imgID.value = img.id;
  previewUrl.value = img.imgUrl;
  dialogRef.value.close();
};
</script>
