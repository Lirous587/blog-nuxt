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
      <svg viewBox="0 0 24 24" width="24" height="24">
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

const tollOpcity = ref("hidden opacity-0");

const scroll = () => {
  const top = document.documentElement.scrollTop || document.body.scrollTop;
  console.log(top);
  if (top > 700) {
    tollOpcity.value = "opacity-100";
  } else {
    tollOpcity.value = "opacity-0";
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
  @apply bg-blue-500 dark:bg-gray-500 rounded-lg w-[32px] h-[32px] flex items-center justify-center hover:cursor-pointer;
}
</style>
