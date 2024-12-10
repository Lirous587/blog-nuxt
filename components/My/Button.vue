<template>
  <div class="inline-block mx-1">
    <el-button :type="type" :size="size" :text="text">
      <slot />
    </el-button>
  </div>
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

<style></style>
