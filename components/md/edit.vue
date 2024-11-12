<template>
  <div>
    <MdEditor
      v-model="content"
      editorId="editorId-edit"
      :theme="themeStore.theme"
      previewTheme="smart-blue"
    ></MdEditor>
  </div>
</template>

<script setup>
import { handleUploadImage } from "./md";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

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
</script>
