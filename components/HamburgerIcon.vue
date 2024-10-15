<template>
  <div
    class="hamburger-btn flex items-center"
    :class="{ 'is-active': isOpen }"
    @click="toggleMenu"
    :style="{
      'caret-color': 'transparent',
      width: `${size}px`,
      height: `${size}px`,
    }"
  >
    <div class="hamburger-icon">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 24,
  },
  color: {
    type: String,
    default: "#909399",
  },
});

const isOpen = ref(false);

const emits = defineEmits(["update:modelValue"]);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  emits("update:modelValue", isOpen.value);
};
</script>

<style scoped>
.hamburger-btn {
  @apply cursor-pointer;
}

.hamburger-icon {
  width: 100%;
  height: 66.67%;
  position: relative;
}

.hamburger-icon span {
  display: block;
  position: absolute;
  height: 12%;
  width: 100%;
  background: v-bind("props.color");
  border-radius: 2px;
  transition: 0.25s ease-in-out;
}

.hamburger-icon span:nth-child(1) {
  top: 0;
  transform: translateY(-50%);
}
.hamburger-icon span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}
.hamburger-icon span:nth-child(3) {
  top: 100%;
  transform: translateY(-50%);
}

.hamburger-btn.is-active .hamburger-icon span:nth-child(1) {
  top: 50%;
  transform: rotate(45deg) translateY(-50%);
}

.hamburger-btn.is-active .hamburger-icon span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.is-active .hamburger-icon span:nth-child(3) {
  top: 50%;
  transform: rotate(-45deg) translateY(-50%);
}
</style>
