<template>
  <div>
    <v-md-editor
      ref="previewRef"
      :include-level="[1, 2, 3, 4, 5, 6]"
      v-model="content"
      :height="ifEdit ? props.height : ''"
      right-toolbar="ifEdit ?  '| toc | tip | todo-list | sync-scroll | preview | fullscreen'"
      :disabled-menus="[]"
      :mode="ifEdit ? 'editable' : 'preview'"
      @upload-image="handleUploadImage"
      class="font-mono"
    />
  </div>
</template>

<script setup>
import { handleUploadImage, disposeMdAnchor } from "./md";

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

const previewRef = ref(null);

let anchors = ref([]);
const hList = ref([]);

let data = {};

onMounted(async () => {
  if (!ifEdit.value) {
    data = disposeMdAnchor(previewRef);
    anchors.value = data.anchors.value;
    hList.value = data.hList;
  }
});

defineExpose({
  anchors,
});
</script>

<style scoped>
:deep(.vuepress-markdown-body) {
  @apply font-mono dark:!bg-gray-800 dark:text-neutral-300;
}
</style>
