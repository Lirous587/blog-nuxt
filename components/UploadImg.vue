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
      <slot name="preview" :previewUrl="previewUrl"> </slot>
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup>
import { adminAuth, adminUploadImg } from "~/api/admin";
import { userAuth, userUploadImg } from "~/api/user";

const props = defineProps({
  authMode: {
    type: String,
    default: "admin",
  },
});

const imgUrl = defineModel("imgUrl", {
  type: String,
  required: true,
});

const previewUrl = ref("");
const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const uploadApi = computed(() => {
  return props.authMode === "admin" ? adminUploadImg : userUploadImg;
});

const uploadAuth = computed(() => {
  return props.authMode === "admin" ? adminAuth : userAuth;
});

const handleFileChange = async () => {
  const file = fileInput.value.files[0];
  if (!file) return;
  // 创建预览URL
  previewUrl.value = URL.createObjectURL(file);
};

const upload = async () => {
  const file = fileInput.value.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append("img", file);
  await uploadAuth.value();
  await uploadApi.value(formData).then((res) => {
    imgUrl.value = res.data;
  });
};

defineExpose({
  upload,
});
</script>
