<template>
  <div class="relative">
    <div
      class="text-3xl text-light-300 bg-gray-500 opacity-50 mb-3 shadow-dark-100 p-4"
    >
      <span class="typewriter-text" ref="typewriterRef"></span>
      <span class="typewriter-cursor"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const typewriterRef = ref(null);
const text = "这是一些文字";

const typeText = (element, text, index = 0) => {
  if (index < text.length) {
    element.textContent += text[index];
  }
  setTimeout(() => typeText(element, text, index + 1), 150); // 控制打字速度
};

onMounted(() => {
  if (typewriterRef.value) {
    typeText(typewriterRef.value, text);
  }
});
</script>

<style scoped>
.typewriter-text {
  display: inline-block;
}

.typewriter-cursor {
  display: inline-block;
  width: 3px;
  height: 1em;
  background-color: currentColor;
  margin-left: 2px;
  animation: blink 0.7s infinite;
  vertical-align: text-top;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
