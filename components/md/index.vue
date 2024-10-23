<template>
  <v-md-editor
    ref="previewRef"
    :include-level="[1, 2, 3, 4, 5, 6]"
    v-model="content"
    :height="ifEdit ? props.height : ''"
    @upload-image="handleUploadImage"
    right-toolbar="ifEdit ?  '| toc | tip| todo-list | sync-scroll | preview | fullscreen'"
    :disabled-menus="[]"
    @copy-code-success="handleCopyCodeSuccess"
    :mode="ifEdit ? 'editable' : 'preview'"
    class="font-mono"
  />
</template>

<script setup>
const props = defineProps({
  height: {
    type: String,
    required: false,
    default: "650px",
  },
  mode: {
    type: String,
    required: false,
    default: "read",
  },
});

const content = defineModel("content", {
  type: String,
  required: true,
});

const previewRef = ref(null);

const ifEdit = computed(() => {
  return props.mode == "edit" ? true : false;
});

const handleCopyCodeSuccess = () => {};

async function handleUploadImage(event, insertImage, files) {
  // try {
  //   // 获取上传的图片文件
  //   const file = files[0]; // 假设只上传了一张图片
  //   // 创建一个 FormData 对象，并将图片文件添加到其中
  //   const formData = new FormData();
  //   formData.append("img", file);
  //   // await uploadImg(formData);
  //   const apiBase = import.meta.env.VITE_APP_BASE_API;
  //   previewRef.value.insert(function (selected) {
  //     const placeholder = `![Description](${apiBase}/img/${file.name})`;
  //     const content = selected || placeholder;
  //     return {
  //       text: `${placeholder}`,
  //       selected: content,
  //     };
  //   });
  // } catch (error) {
  //   toast("上传图片失败", "error");
  // }
}
</script>

<style scoped>
:deep(.vuepress-markdown-body) {
  @apply font-mono;
}
</style>
