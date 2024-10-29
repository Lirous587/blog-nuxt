<template>
  <div class="fixed inset-0 top-[60px] h-[calc(100vh-60px)] z-[-1]">
    <el-image :src="imgUrl" fit="cover" class="w-full h-full" @load="imgLoad" />
    <div
      class="absolute inset-0 top-[50%] translate-y-[-50%] flex flex-col justify-center items-center"
      v-show="loading"
    >
      <TypeWriter
        class="p-3 rounded-xl text-3xl text-white text-opacity-60 bg-black bg-opacity-40 mb-5"
        firstWord="春花秋月何时了"
        lastWord="往事知多少"
      />

      <div class="flex justify-center items-center">
        <div
          v-for="(word, index) in '罹景不想coding'"
          class="relative inline-flex text-3xl mx-2 text-white float-action"
          :style="{ animationDelay: `${index * -0.5}s` }"
        >
          {{ word }}
          <div class="absolute top-[100%] rotate-180 text-gray-500 opacity-70">
            {{ word }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const imgUrlArr = ref(["http://liuzihao.online:8080/api/img/6.png"]);

const imgUrl = ref(
  imgUrlArr.value[Math.floor(Math.random() * imgUrlArr.value.length)]
);

const loading = ref(false);
const imgLoad = () => {
  loading.value = true;
};
</script>

<style scoped>
* {
  font-family: "myFont";
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
