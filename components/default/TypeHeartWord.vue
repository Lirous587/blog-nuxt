<template>
  <div
    class="absolute inset-0 top-[50%] translate-y-[-50%] flex flex-col justify-center items-center"
  >
    <TypeWriter
      class="p-3 rounded-xl text-xl text-neutral-300 bg-black/40 mb-5"
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
</template>

<script setup>
import { useMyIndexStore } from "~/store";

const indexStore = useMyIndexStore();

const heartWords = indexStore.getHeartWords();

const sentenceList = ref([]);
sentenceList.value = heartWords.map((item) => item.content);
</script>

<style scoped>
@reference "assets/css/tailwind.css";

* {
  @apply font-serif;
}
</style>
