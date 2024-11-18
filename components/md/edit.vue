<template>
  <MdEditor
    v-model="content"
    editorId="editorId-edit"
    previewTheme="smart-blue"
    :showToolbarName="true"
    :theme="themeStore.theme"
    :toolbarsExclude="toolbarsExclude"
    noUploadImg
  >
  </MdEditor>
</template>

<script setup>
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
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

const themeStore = useMyThemeStore();
</script>
