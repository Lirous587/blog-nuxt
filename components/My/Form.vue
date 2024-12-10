<template>
  <el-form :model="model" :labelWidth="labelWidth" :inline="inline">
    <slot></slot>
  </el-form>
</template>

<script setup>
const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
  },
  labelWidth: {
    type: String,
    default: "80px",
  },
  inline: {
    type: Boolean,
    default: false,
  },
});
</script>

<style></style>
