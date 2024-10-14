<template>
  <div class="flex items-center px-2 cursor-pointer h-[2em] min-h-[2em]">
    <span class="text-[1em] leading-[2em]">{{ displayedText }}</span>
    <span
      class="h-[1em] w-[1px] inline-block bg-white typewriter-cursor-animation align-middle"
    ></span>
  </div>
</template>

<script setup>
const props = defineProps({
  firstWord: {
    type: String,
    required: true,
  },
  lastWord: {
    type: String,
    required: true,
  },
  typingSpeed: {
    type: Number,
    default: 200,
  },
  pauseBetweenWords: {
    type: Number,
    default: 1000,
  },
});

const displayedText = ref("");
const isTyping = ref(true);
const currentWordIndex = ref(0);

const words = [props.firstWord, props.lastWord];

const currentWord = computed(() => words[currentWordIndex.value]);

const typeWord = () => {
  if (displayedText.value.length < currentWord.value.length) {
    displayedText.value += currentWord.value[displayedText.value.length];
  } else {
    isTyping.value = false;
  }
};

const deleteWord = () => {
  if (displayedText.value.length > 0) {
    displayedText.value = displayedText.value.slice(0, -1);
  } else {
    isTyping.value = true;
    currentWordIndex.value = (currentWordIndex.value + 1) % words.length;
  }
};

let timer;

onMounted(() => {
  watch(
    [isTyping, displayedText],
    () => {
      clearTimeout(timer);
      if (isTyping.value) {
        if (displayedText.value.length === currentWord.value.length) {
          timer = setTimeout(() => {
            isTyping.value = false;
          }, props.pauseBetweenWords);
        } else {
          timer = setTimeout(typeWord, props.typingSpeed);
        }
      } else {
        timer = setTimeout(deleteWord, props.typingSpeed);
      }
    },
    { immediate: true }
  );
});
</script>

<style scoped>
@keyframes cursor-animation {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.typewriter-cursor-animation {
  animation: cursor-animation 1s infinite;
}
</style>
