<template>
  <div>
    <MdEditor
      v-model="content"
      editorId="editorId-edit"
      previewTheme="smart-blue"
      :showToolbarName="true"
      @onUploadImg="onUploadImg"
      :theme="themeStore.theme"
    ></MdEditor>
  </div>
</template>

<script setup>
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { uploadImg } from "~/api/admin";
import { useMyThemeStore } from "~/store/theme";

const props = defineProps({
  height: {
    type: String,
    required: false,
    default: "700px",
  },
});

const content = defineModel("content", {
  type: String,
  required: true,
});

const themeStore = useMyThemeStore();

const imgPre = useRuntimeConfig().public.imgBase + "/";

const onUploadImg = async (files, callback) => {
  const processedFiles = files.map((file) => {
    // 创建一个新的文件名，移除空格和 -
    const newFileName = file.name.replace(/[\s-]/g, "");
    // 创建一个新的 File 对象，使用新的文件名
    return new File([file], newFileName, { type: file.type });
  });

  const res = await Promise.all(
    processedFiles.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append("img", file);
        uploadImg(form)
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );

  callback(res.map((item) => imgPre + item.data));
};
</script>
