<template>
  <div class="relative" @click="anchorVisiable = false">
    <v-md-editor
      style="scroll-behavior: smooth"
      ref="previewRef"
      :include-level="[1, 2, 3, 4, 5, 6]"
      v-model="content"
      :height="ifEdit ? props.height : ''"
      right-toolbar="ifEdit ?  '| toc | tip| todo-list | sync-scroll | preview | fullscreen'"
      :disabled-menus="[]"
      :mode="ifEdit ? 'editable' : 'preview'"
      class="font-mono"
    />

    <div v-if="!ifEdit">
      <div ref="bottomRef"></div>
      <div
        v-if="anchorVisiable"
        class="fixed flex flex-col top-[70px] right-5 z-20 px-2 py-1 rounded-md bg-white shadow-xl"
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
        <el-tooltip
          class="box-item"
          effect="dark"
          content="文章目录"
          placement="right"
        >
          <div
            @click.stop="anchorVisiable = !anchorVisiable"
            class="hover:cursor-pointer rounded-full bg-white shadow-xl w-[40px] h-[40px] flex items-center justify-center"
          >
            <el-icon size="26" color="rgb(119, 122, 175)"><Memo /></el-icon>
          </div>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="回到顶部"
          placement="right"
        >
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
        </el-tooltip>
      </div>
    </div>
  </div>
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

const ifEdit = computed(() => {
  return props.mode == "edit" ? true : false;
});

const previewRef = ref(null);

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
  console.log("?");
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
  throttledScroll.value = throttle(scrollHandler, 300);
  const { anchors } = disposeMdAnchor(previewRef, router);
  anchorList.value = anchors;
  hList.value = previewRef.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
  mainBox.addEventListener("scroll", throttledScroll.value);
  scrollHandler();
  if (route.hash.split("#")[1] < hList.value.length) {
    hList.value[route.hash.split("#")[1]].firstChild.click();
  }
});
onUnmounted(() => {
  mainBox.removeEventListener("scroll", throttledScroll.value);
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
</style>
