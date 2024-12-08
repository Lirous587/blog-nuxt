<template>
  <div
    class="flex flex-col transition-all duration-300 gap-y-1 border dark:border-none rounded-xl mb-4 dark:text-neutral-300 pl-10 py-3 bg-gradient-to-br from-neutral-50 to-zinc-100 dark:from-pink-900 dark:to-slate-900"
  >
    <div
      class="h-[1em] leading-[1em] font-bold relative pl-1 mb-2 pointer-events-none"
    >
      文章目录
      <div
        class="absolute flex flex-col top-0 h-[1em] justify-around translate-x-[-120%]"
      >
        <span
          class="w-[1em] h-[calc(1em/6)] rounded-md content-[''] bg-black dark:bg-neutral-300"
        >
        </span>
        <span
          class="w-[1em] h-[calc(1em/6)] rounded-md content-[''] bg-black dark:bg-neutral-300"
        >
        </span>
        <span
          class="w-[1em] h-[calc(1em/6)] rounded-md content-[''] bg-black dark:bg-neutral-300"
        >
        </span>
      </div>
    </div>
    <a
      v-for="(item, index) in anchors"
      :key="index"
      class="anchor"
      :class="item.active ? 'active' : ''"
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

<style scoped>
.anchor {
  @apply relative  hover:cursor-pointer transition-all duration-300  lg:text-lg font-mono pr-5;
}

.anchor:hover {
  @apply text-pink-300 scale-110;
}

.active {
  @apply !text-yellow-300 blur-0 scale-110;
}
.anchor-outer:hover a {
  @apply blur-0;
}
</style>
