<template>
  <div>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      accept="image/*"
      class="hidden"
    />
    <div @click="triggerFileInput">
      <slot name="default" v-if="!previewUrl"></slot>
      <slot name="preview" v-else :previewUrl="previewUrl"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sizeLimit: {
    type: String,
    default: "1MB",
  },
});

const imgData = defineModel("imgData", {
  type: Object,
});

const previewUrl = ref("");
const fileInput = ref(null);
let currentObjectUrl = null;

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = () => {
  const file = fileInput.value.files[0];
  if (!file) return;
  // 获取文件大小限制
  const sizeLimitInBytes = parseSizeLimit(props.sizeLimit);
  // 检查文件大小
  if (file.size > sizeLimitInBytes) {
    ElMessage.warning(`文件大小不能超过 ${props.sizeLimit}`);
    fileInput.value.value = ""; // 清空文件选择
    // 清空之前数据
    imgData.value = null;
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
    }
    previewUrl.value = "";
    return;
  }
  imgData.value = file;
  // 释放上一个预览 URL
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
  }
  currentObjectUrl = URL.createObjectURL(file);
  previewUrl.value = currentObjectUrl;
};

// 解析大小限制字符串
const parseSizeLimit = (sizeLimit) => {
  const size = parseInt(sizeLimit, 10);
  if (sizeLimit.endsWith("MB")) {
    return size * 1024 * 1024;
  } else if (sizeLimit.endsWith("KB")) {
    return size * 1024;
  } else {
    return size;
  }
};
</script>
