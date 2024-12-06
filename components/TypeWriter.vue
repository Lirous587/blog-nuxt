<template>
  <div class="flex items-center px-2 cursor-pointer">
    <div
      class="text-[0.65em] leading-[1.1em] md:text-[0.8em] md:leading-[1.4em]"
    >
      {{ displayedText }}
      <span
        class="h-[1em] lg:h-[1.4em] w-[1px] inline-block bg-white typewriter-cursor-animation align-middle"
      ></span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sentenceList: {
    type: Array,
    required: true,
  },
  addSpeed: {
    type: Number,
    default: 200,
  },
  deleteSpeed: {
    type: Number,
    default: 100,
  },
  pauseBetweenWords: {
    type: Number,
    default: 1000,
  },
});

const displayedText = ref("");
const isTyping = ref(true);
const sentenceIndex = ref(0);

const nowSentence = computed(() => {
  return props.sentenceList[sentenceIndex.value];
});

const typeWord = () => {
  if (displayedText.value.length < nowSentence.value.length) {
    displayedText.value += nowSentence.value[displayedText.value.length];
  } else {
    isTyping.value = false;
  }
};

const deleteWord = () => {
  if (displayedText.value.length > 0) {
    displayedText.value = displayedText.value.slice(0, -1);
  } else {
    isTyping.value = true;
    sentenceIndex.value = (sentenceIndex.value + 1) % props.sentenceList.length;
  }
};

let timer;

const updateTyping = () => {
  clearTimeout(timer);
  if (isTyping.value) {
    if (displayedText.value.length === nowSentence.value.length) {
      timer = setTimeout(() => {
        isTyping.value = false;
      }, props.pauseBetweenWords);
    } else {
      timer = setTimeout(typeWord, props.addSpeed);
    }
  } else {
    timer = setTimeout(deleteWord, props.deleteSpeed);
  }
};

onMounted(() => {
  watch([isTyping, displayedText], updateTyping, { immediate: true });
});

onUnmounted(() => {
  clearTimeout(timer);
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
