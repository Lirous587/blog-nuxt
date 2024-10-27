<template>
  <div class="relative">
    <v-md-editor
      style="scroll-behavior: smooth"
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
      <div ref="bottomRef"></div>
      <div
        v-if="anchorVisiable"
        @click.stop="() => {}"
        class="fixed flex flex-col top-[80px] right-5 z-20 pr-3 py-1 rounded-md bg-white shadow-xl max-h-[70vh] overflow-y-scroll anchors"
      >
        <a
          v-for="(item, index) in anchorList"
          :href="'#' + item.id"
          :key="index"
          @click.stop="handleAnchorClick($event, index)"
          class="anchor"
          :class="route.hash == '#' + item.id ? 'active' : ''"
          :style="{ paddingLeft: (item.indent + 1) * 15 + 'px' }"
        >
          {{ item.title }}
        </a>
      </div>

      <div class="fixed flex flex-col bottom-[70px] right-10 z-30 gap-y-2">
        <div
          @click.stop="anchorVisiable = !anchorVisiable"
          class="hover:cursor-pointer rounded-full bg-white shadow-xl w-[40px] h-[40px] flex items-center justify-center"
        >
          <el-icon size="26" color="rgb(119, 122, 175)"><Memo /></el-icon>
        </div>
        <div
          @click="toTop"
          class="hover:cursor-pointer rounded-full bg-white shadow-xl w-[40px] h-[40px] flex items-center justify-center"
        >
          <div
            ref="toIconRef"
            class="transition-all duration-300 flex items-center justify-center"
          >
            <el-icon size="26" color="rgb(119, 122, 175)"><Top /></el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { uploadImg } from "~/api/admin";

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

async function handleUploadImage(event, insertImage, files) {
  try {
    // 获取上传的图片文件
    const file = files[0]; // 假设只上传了一张图片
    // 创建一个 FormData 对象，并将图片文件添加到其中
    const formData = new FormData();
    formData.append("img", file);

    await uploadImg(formData);

    const apiBase = useRuntimeConfig().public.apiBase;

    previewRef.value.insert(function (selected) {
      const placeholder = `![Description](${apiBase}/img/${file.name})`;
      const content = selected || placeholder;
      return {
        text: `${placeholder}`,
        selected: content,
      };
    });
  } catch (error) {
    ElMessage.error("上传失败");
  }
}

const route = useRoute();
const router = useRouter();
const anchorList = ref([]);
const hList = ref([]);
const anchorVisiable = ref(false);

const handleAnchorClick = (e, index) => {
  e.preventDefault();
  hList.value[index].firstChild.click();
};

const mainBox = document.getElementById("mainBox");

const bottomRef = ref(null);
const toIconRef = ref(null);

const direction = ref("top");

const toTop = () => {
  if (direction.value == "top") {
    mainBox.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    bottomRef.value.scrollIntoView({
      behavior: "smooth",
    });
  }
};

const scrollHandler = () => {
  if (mainBox.scrollTop > 100) {
    toIconRef.value.classList.remove("reverse");
    direction.value = "top";
  } else {
    toIconRef.value.classList.add("reverse");
    direction.value = "bottom";
  }
};
const throttledScroll = ref(null);

onMounted(() => {
  if (!ifEdit.value) {
    throttledScroll.value = throttle(scrollHandler, 50);
    const { anchors } = disposeMdAnchor(previewRef, router);
    anchorList.value = anchors;
    hList.value = previewRef.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
    mainBox.addEventListener("scroll", throttledScroll.value);
    scrollHandler();
    if (route.hash.split("#")[1] < hList.value.length) {
      hList.value[route.hash.split("#")[1]].firstChild.click();
    }

    document.body.addEventListener("click", () => {
      anchorVisiable.value = false;
    });
  }
});

onUnmounted(() => {
  if (!ifEdit.value) {
    mainBox.removeEventListener("scroll", throttledScroll.value);
  }
});
</script>

<style scoped>
:deep(.vuepress-markdown-body) {
  @apply font-mono;
}
.anchor {
  @apply relative leading-[1.5em] h-[1.5em] my-1 hover:cursor-pointer;
}
.anchor:hover {
  @apply bg-blue-100;
}
.anchor:hover::before {
  content: "";
  @apply absolute left-0 h-[1.5em] w-[2px] bg-blue-400;
}
.active {
  @apply bg-blue-100;
}
.active::before {
  content: "";
  @apply absolute left-0 h-[1.5em] w-[2px] bg-blue-400;
}
.reverse {
  @apply rotate-180;
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
