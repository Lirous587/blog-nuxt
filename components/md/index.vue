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

    <div v-if="!ifEdit">
      <div
        v-if="anchorVisiable"
        ref="asideAnchorRef"
        @click.stop="() => {}"
        class="fixed flex flex-col top-[80px] right-5 z-20 pl-[3px] pr-3 py-1 rounded-md bg-white shadow-xl max-h-[70vh] overflow-y-scroll anchors"
      >
        <a
          v-for="(item, index) in anchors"
          :key="index"
          class="anchor"
          :style="{
            paddingLeft: (item.indent + 1) * 15 + 'px',
            '--s': `--t${index}`,
          }"
          :href="'#' + item.id"
        >
          {{ item.title }}
        </a>
      </div>
    </div>

    <div class="fixed flex flex-col bottom-[70px] right-10 z-30 gap-y-2">
      <div
        @click.stop="anchorVisiable = !anchorVisiable"
        class="hover:cursor-pointer rounded-full bg-white dark:bg-black shadow-xl w-[40px] h-[40px] flex items-center justify-center"
      >
        <el-icon size="26" color="rgb(119, 122, 175)"><Memo /></el-icon>
      </div>
      <div
        class="hover:cursor-pointer rounded-full transition-all duration-200 bg-white dark:bg-black shadow-xl w-[40px] h-[40px] flex items-center justify-center"
      >
        <el-icon size="26" color="rgb(119, 122, 175)"><Top /></el-icon>
      </div>
    </div>
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

const asideAnchorRef = ref(null);
const anchors = ref([]);
const hList = ref([]);
const anchorVisiable = ref(true);

function bodyClickHandel() {
  anchorVisiable.value = false;
}

let data = {};

onMounted(async () => {
  if (!ifEdit.value) {
    data = disposeMdAnchor(previewRef);
    anchors.value = data.anchors;
    hList.value = data.hList;

    document.body.addEventListener("click", bodyClickHandel);
  }
});

onBeforeUnmount(() => {
  if (!ifEdit.value) {
    document.body.removeEventListener("click", bodyClickHandel);
  }
});
</script>

<style scoped>
:deep(.v-md-editor__preview-wrapper),
:deep(.scrollbar),
:deep(.scrollbar__wrap),
:deep(.v-md-editor__editor-wrapper),
:deep(.v-md-editor__main) {
  overflow: visible;
}

:deep(.vuepress-markdown-body) {
  @apply font-mono dark:!bg-gray-800 dark:text-white;
}

@keyframes active {
  0%,
  100% {
    @apply bg-pink-400 border-l-8 border-blue-800 ring-[2px] ring-pink-400;
  }
}

.anchor {
  @apply relative leading-[1.5em] h-[1.5em] my-1 hover:cursor-pointer transition-all duration-300;
  animation: active;
  animation-timeline: var(--s);
}

.anchors {
  @apply font-mono dark:!bg-gray-800 dark:text-neutral-50;
}
.anchors::-webkit-scrollbar {
  width: 3px;
  height: 1px;
}

.anchors::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgb(128, 128, 185);
}

.anchors::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
