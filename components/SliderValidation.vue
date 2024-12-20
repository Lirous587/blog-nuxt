<template>
  <div class="slider-validation flex flex-col items-center">
    <img class="block w-[80%] object-cover" :src="randomImg" alt="验证码图片" />
    <div ref="slideContainerRef" class="h-[40px] w-[80%] bg-blue-100">
      <div
        ref="slideItemRef"
        class="w-[40px] h-[40px] rounded-full bg-white"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { useMyIndexStore } from "~/store";
definePageMeta({
  middleware: "index-data",
});
const imgPre = useRuntimeConfig().public.imgBase + "/";
const indexStore = useMyIndexStore();
const emits = defineEmits(["confirm"]);

const imglist = indexStore.getImgList();

const slideItemRef = ref(null);
const slideContainerRef = ref(null);

const clipSize = {
  w: "30px",
  y: "30px",
};

const randomImg =
  imgPre + imglist[Math.floor(imglist.length * Math.random())].url;

onMounted(() => {
  slideItemRef.value.addEventListener("click", () => {
    scrollLeftOfWindow = scrollDom.getBoundingClientRect().left;
  });
});
</script>

<style scoped>
/* .slider-validation {
  --move: clamp(0);
} */
</style>
