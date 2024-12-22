<template>
  <div
    class="fixed bottom-[20px] right-[20px] flex flex-col gap-y-3 z-50 transition-all duration-500"
    :class="tollOpcity"
  >
    <!-- top -->
    <div
      class="tool-container"
      v-if="toolList.includes('top')"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" width="24px" height="24px">
        <path
          fill="white"
          d="M12 2l-6 6h4v12h4V8h4z"
          stroke="white"
          stroke-width="2"
        />
      </svg>
    </div>

    <!-- menu -->
    <div
      class="tool-container md:!hidden"
      v-if="toolList.includes('menu')"
      @click.stop="props.menuFunc"
    >
      <el-icon size="24" color="white"><Memo /></el-icon>
    </div>

    <!-- chat -->
    <div
      class="tool-container"
      v-if="toolList.includes('chat')"
      @click.stop="props.chatFunc"
    >
      <el-icon size="24" color="white"><ChatDotRound /></el-icon>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  toolList: {
    type: Array,
    default: ["top"],
  },
  menuFunc: {
    type: Function,
    default: () => {},
  },
  chatFunc: {
    type: Function,
    default: () => {},
  },
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const tollOpcity = ref("hidden opacity-0 translate-x-[calc(100%+25px)]");

const scroll = () => {
  const top = document.documentElement.scrollTop || document.body.scrollTop;
  if (top > 700) {
    tollOpcity.value = "opacity-100 translate-x-[0px]";
  } else {
    tollOpcity.value = "opacity-0 translate-x-[calc(100%+25px)]";
  }
};

const throttleScroll = throttle(scroll, 200);

onMounted(() => {
  window.addEventListener("scroll", throttleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", throttleScroll);
});
</script>

<style scoped>
.tool-container {
  @apply bg-[rgb(53,212,244)] dark:bg-[rgba(53,212,244,0.77)] rounded-lg w-[28px] h-[28px] md:w-[32px] md:h-[32px] flex items-center justify-center hover:cursor-pointer;
}
</style>
