<template>
  <MyDialog title="选择图片" width="100%" ref="dialogRef" class="overflow-auto">
    <AdminGallery :oID="imgID" @select="handleSelectImg" />
  </MyDialog>
  <div
    @click="dialogRef.open"
    class="w-[200px] h-[200px] flex items-center justify-center overflow-hidden border border-pink-200 dark:border-gray-600 rounded-md"
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
  previewUrl.value = img.url;
  dialogRef.value.close();
};
</script>
