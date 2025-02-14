<template>
  <div>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      accept="image/*"
      class="hidden"
    />
    <!-- 原有展示区域 -->
    <div @click="triggerFileInput">
      <slot name="default" v-if="!previewUrl"></slot>
      <slot name="preview" v-else :previewUrl="previewUrl"></slot>
    </div>
    <!-- 裁剪遮罩层，不影响原有布局 -->
    <Teleport to="body">
      <div
        v-if="isCropping"
        class="fixed inset-0 flex items-center justify-center bg-black/80 z-[9999]"
      >
        <div class="bg-pink-200 p-4 rounded overflow-auto">
          <img
            ref="imageForCrop"
            class="min-w-[50vw] max-h-[60vh]"
            :src="previewUrl"
            alt="Crop Image"
          />
          <div class="mt-2 flex justify-around">
            <el-button type="primary" class="!rounded-lg" @click="confirmCrop"
              >裁剪</el-button
            >
            <el-button type="warning" class="!rounded-lg" @click="cancelCrop"
              >取消</el-button
            >
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

const props = defineProps({
  sizeLimit: {
    type: String,
    default: "3MB",
  },
  CropRatio: {
    type: Number,
    default: 1,
  },
  CropHeight: {
    type: Number,
    default: 200,
  },
  CropWidth: {
    type: Number,
    default: 200,
  },
  ifCustom: {
    type: Boolean,
    default: false,
  },
});

// 保持原有使用方式
const imgData = defineModel("imgData", {
  type: Object,
});

const previewUrl = ref("");
const fileInput = ref(null);
let currentObjectUrl = null;

// 控制裁剪功能显示状态
const isCropping = ref(false);
let cropper = null;
const imageForCrop = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = async () => {
  const file = fileInput.value.files[0];
  if (!file) return;
  // 获取文件大小限制
  const sizeLimitInBytes = parseSizeLimit(props.sizeLimit);
  // 检查文件大小
  if (file.size > sizeLimitInBytes) {
    ElMessage.warning(`文件大小不能超过 ${props.sizeLimit}`);
    fileInput.value.value = ""; // 清空文件选择
    imgData.value = null;
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
    }
    previewUrl.value = "";
    return;
  }
  // 保存原始文件
  imgData.value = file;
  // 释放上一次的 URL
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
  }
  currentObjectUrl = URL.createObjectURL(file);
  previewUrl.value = currentObjectUrl;

  // 显示裁剪遮罩层
  isCropping.value = true;
  await nextTick();
  initCropper();
};

const initCropper = () => {
  if (imageForCrop.value) {
    cropper = new Cropper(imageForCrop.value, {
      aspectRatio: props.CropRatio, // 可自行设置固定比例，例如 16/9
      viewMode: 1,
      autoCropArea: 0.5, // 裁剪框默认占图片50%
      dragMode: props.ifCustom ? "crop" : "move", // move是固定裁剪框，不允许拖动改变大小
      cropBoxResizable: props.ifCustom, // 禁止调整裁剪框大小
      ready() {
        if (!props.ifCustom) {
          cropper.setCropBoxData({
            width: props.CropWidth,
            height: props.CropHeight,
          });
        }
      },
    });
  }
};

const confirmCrop = () => {
  if (cropper) {
    const canvas = cropper.getCroppedCanvas();
    if (canvas) {
      canvas.toBlob((blob) => {
        // 更新 imgData 为裁剪后的 blob 数据
        imgData.value = blob;
        // 生成新的预览 URL
        const croppedUrl = URL.createObjectURL(blob);
        if (currentObjectUrl) {
          URL.revokeObjectURL(currentObjectUrl);
        }
        currentObjectUrl = croppedUrl;
        previewUrl.value = croppedUrl;
        // 销毁 cropper 实例并隐藏裁剪界面
        cropper.destroy();
        cropper = null;
        isCropping.value = false;
      }, "image/jpeg");
    }
  }
};

const cancelCrop = () => {
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  // 取消裁剪，保留原图预览
  isCropping.value = false;
};

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

onUnmounted(() => {
  if (cropper) {
    cropper.destroy();
  }
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
  }
});
</script>
