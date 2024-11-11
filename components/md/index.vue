<template>
  <!-- <div>
    <v-md-editor
      :height="ifEdit ? props.height : ''"
      right-toolbar="ifEdit ?  '| toc | tip | todo-list | sync-scroll | preview | fullscreen'"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      class="font-mono"
    />
  </div> -->
  <div>
    <!-- <MdEditor
      editorId="editorId-edit"
      :theme="themeStore.theme"
      codeTheme="atom"
      v-model="content"
      previewTheme="smart-blue"
      v-if="ifEdit"
      ref="mdEditorRef"
    ></MdEditor> -->
    <MdPreview
      editorId="editorId-preview"
      :theme="themeStore.theme"
      :codeTheme="themeStore.theme"
      v-model="content"
      previewTheme="smart-blue"
      :mdHeadingId="mdHeadingId"
    />
  </div>
</template>

<script setup>
import { handleUploadImage, disposeMdAnchor } from "./md";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { MdPreview, MdCatalog } from "md-editor-v3";
// preview.css相比style.css少了编辑器那部分样式
import "md-editor-v3/lib/preview.css";
import { useMyThemeStore } from "~/store/theme";

const mdEditorRef = ref(null);

const props = defineProps({
  height: {
    type: String,
    required: false,
    default: "700px",
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

const ifEdit = computed(() => {
  return props.mode == "edit" ? true : false;
});

const themeStore = useMyThemeStore();

const anchorIdList = ref([]);

const mdHeadingId = (text, _level, index) => {
  const anchorId = `${text}-${index}`;
  anchorIdList.value.push(anchorId);
  return anchorId;
};

let anchors = ref([]);
const hList = ref([]);

let data = {};

onMounted(() => {
  if (!ifEdit.value) {
    data = disposeMdAnchor(anchorIdList.value);
    anchors.value = data.anchors.value;
    hList.value = data.hList;
  }
});

defineExpose({
  anchors,
});
</script>
