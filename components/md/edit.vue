<template>
  <div>
    <el-button type="primary" class="m-1" @click="chooseGallery">
      选择图片
    </el-button>

    <el-dialog
      title="选择图片"
      width="80%"
      align-center
      v-model="dialogVisiable"
    >
      <Gallery @select-img="handelSelectImg"></Gallery>
    </el-dialog>

    <MdEditor
      v-model="content"
      editorId="editorId-edit"
      previewTheme="smart-blue"
      :showToolbarName="true"
      :theme="themeStore.theme"
      :toolbarsExclude="toolbarsExclude"
      noUploadImg
      ref="editorRef"
    >
    </MdEditor>
  </div>
</template>

<script setup>
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { uploadImg } from "~/api/admin";
import { useMyThemeStore } from "~/store/theme";

const toolbarsExclude = ["save", "preview", "htmlPreview", "github"];

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

const editorRef = ref(null);

const themeStore = useMyThemeStore();

const dialogVisiable = ref(false);
const chooseGallery = () => {
  dialogVisiable.value = true;
};

const imgPre = useRuntimeConfig().public.imgBase + "/";

const handelSelectImg = (img) => {
  const imgUrl = imgPre + img.url;
  editorRef.value?.insert(() => {
    return {
      targetValue: `\n![](${imgUrl})\n`,
      select: false,
      deviationStart: 0,
      deviationEnd: 0,
    };
  });
  dialogVisiable.value = false;
};
</script>
