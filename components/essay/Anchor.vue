<template>
  <div
    class="relative select-none hover:cursor-pointer text-gray-700 dark:text-gray-500"
    v-if="Array.isArray(anchors) && anchors.length > 0"
  >
    <header>
      <h3 class="text-lg font-bold">目录</h3>
      <div class="my-1.5 h-[1px] bg-gray-200 dark:bg-gray-600"></div>
    </header>

    <main
      ref="anchorMain"
      class="w-[200px] h-[420px] overflow-auto anchor-main"
    >
      <div class="flex flex-col gap-y-2">
        <a
          v-for="(item, index) in anchors"
          :key="index"
          :class="
            item.active
              ? 'active-anchor !text-blue-400 blur-none scale-110'
              : ''
          "
          class="font-serif text-sm lg:text-sm hover:text-blue-300 hover:scale-105 transition-all duration-300 p-0.5 pl-2 truncate"
          :href="'#' + item.id"
        >
          <span class="ml-0.5">{{ item.title }}</span>
        </a>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";

const props = defineProps({
  anchors: {
    type: Array,
    required: true,
  },
});

const anchorMain = ref(null);

const scrollToActive = () => {
  nextTick(() => {
    const container = anchorMain.value;
    const activeAnchor = container.querySelector(".active-anchor");
    if (container && activeAnchor) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeAnchor.getBoundingClientRect();
      // 计算 activeAnchor 相对于容器的偏移量，
      // 并使其处于容器中间位置
      const offset =
        activeRect.top -
        containerRect.top -
        containerRect.height / 2 +
        activeRect.height / 2;
      container.scrollTo({
        top: container.scrollTop + offset,
        behavior: "smooth",
      });
    }
  });
};
onMounted(scrollToActive);
watch(
  () => props.anchors,
  () => {
    scrollToActive();
  },
  { deep: true }
);
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
.anchor-main::-webkit-scrollbar {
  display: none;
}
</style>
