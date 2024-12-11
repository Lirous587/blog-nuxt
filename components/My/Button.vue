<template>
  <el-button class="mx-1" :type="type" :size="size" :text="text">
    <slot />
  </el-button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "default",
  },
  text: {
    type: Boolean,
    default: false,
  },
});
</script>
