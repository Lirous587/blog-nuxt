<template>
  <div class="relative w-full h-[100vh] overflow-hidden">
    <div class="relative w-full h-full">
      <el-image
        loading="eager"
        :src="imgUrl"
        fit="cover"
        class="w-full h-full"
      />

      <div
        class="absolute inset-0 bg-black bg-opacity-50 pointer-events-none hidden dark:block"
      ></div>
    </div>
    <div
      class="absolute inset-0 top-[50%] translate-y-[-50%] flex flex-col justify-center items-center"
    >
      <TypeWriter
        class="p-3 rounded-xl text-xl text-neutral-300 text-opacity-60 bg-black bg-opacity-40 mb-5"
        :sentenceList="sentenceList"
        :addSpeed="150"
        :deleteSpeed="70"
      />

      <div class="flex justify-center items-center">
        <div
          v-for="(word, index) in 'Lirous不想coding'"
          class="relative inline-flex text-sm mx-2 float-action text-neutral-300 md:text-base lg:text-lg"
          :style="{ animationDelay: `${index * 0.3}s` }"
        >
          {{ word }}
          <div class="absolute top-[100%] rotate-180 text-gray-500 opacity-70">
            {{ word }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute flex cursor-pointer h-[30px] bottom-[60px] items-center justify-center left-[50%] translate-x-[-50%] text-gray-300"
      @click="scrollToMain"
    >
      <el-icon size="24"><ArrowDownBold /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { useMyIndexStore } from "~/store";

const imgPre = useRuntimeConfig().public.imgGalleryBase + "/";

const indexStore = useMyIndexStore();

const list = indexStore.getHeartWordsList();

const imgUrl = ref(imgPre + list[0]?.img.url);

const sentenceList = ref([]);
sentenceList.value = list.map((item) => item.content);

const scrollToMain = () => {
  const height = window.innerHeight;
  window.scroll({
    top: height,
    behavior: "smooth",
  });
};
</script>

<style scoped>
* {
  @apply font-serif;
}

.float-action {
  animation: float 1.5s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
