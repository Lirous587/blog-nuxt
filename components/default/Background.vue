<template>
  <div class="select-none w-screen h-screen overflow-hidden">
    <div class="w-full h-full">
      <el-image
        loading="eager"
        :src="imgUrl"
        fit="cover"
        class="w-full h-full dark:opacity-60"
      />
    </div>
    <slot />
    <div
      class="animate-bounce absolute flex cursor-pointer bottom-[60px] p-5 items-center justify-center left-[50%] translate-x-[-50%] text-white/80 dark:text-white/50"
      :class="showIcon ? '' : 'hidden'"
      @click="scrollToMain"
    >
      <el-icon size="30"><ArrowDownBold /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { useMyIndexStore } from "~/store";

const props = defineProps({
  showIcon: {
    type: Boolean,
    default: true,
  },
});

const imgPre = useRuntimeConfig().public.imgGalleryBase;

const indexStore = useMyIndexStore();

const carousels = indexStore.getCarousels();

const imgUrl = ref(imgPre + carousels[0]?.img.url);

const scrollToMain = () => {
  const height = window.innerHeight;
  window.scroll({
    top: height,
    behavior: "smooth",
  });
};
</script>
