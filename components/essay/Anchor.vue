<template>
  <div
    class="select-none flex flex-col gap-y-1 pl-7 py-3 hover:cursor-pointer dark:text-neutral-300 bg-gradient-to-br from-neutral-50 to-zinc-100 dark:from-pink-900 dark:to-slate-900"
    v-if="Array.isArray(anchors) && anchors.length > 0"
  >
    <div
      class="h-[1em] leading-[1em] font-bold relative pl-1 mb-2 pointer-events-none"
    >
      <div
        class="absolute flex flex-col top-0 h-[1em] justify-around translate-x-[-120%]"
      >
        <span
          class="w-[1em] h-[calc(1em/6)] rounded-md content-[''] bg-pink-400 dark:bg-pink-300"
        >
        </span>
        <span
          class="w-[1em] h-[calc(1em/6)] rounded-md content-[''] bg-pink-400 dark:bg-pink-300"
        >
        </span>
        <span
          class="w-[1em] h-[calc(1em/6)] rounded-md content-[''] bg-pink-400 dark:bg-pink-300"
        >
        </span>
      </div>
      <span class="text-blue-500 dark:text-blue-400"> 文章目录 </span>
    </div>
    <a
      v-for="(item, index) in anchors"
      :key="index"
      class="relative font-serif pr-5 text-sm lg:text-sm hover:text-pink-300 hover:scale-110 transition-all duration-300"
      :class="item.active ? '!text-yellow-300 blur-none scale-110' : ''"
      :href="'#' + item.id"
    >
      {{ item.title }}
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  anchors: {
    type: Array,
    required: true,
  },
});
</script>
