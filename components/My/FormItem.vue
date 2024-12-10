<template>
  <el-form-item :label="label">
    <slot></slot>
  </el-form-item>
</template>

<script setup>
const porps = defineProps({
  label: {
    type: String,
    default: "",
  },
});
</script>
