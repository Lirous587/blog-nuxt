<template>
  <div>
    <MyFormItem :label="label">
      <slot></slot>
    </MyFormItem>
  </div>
</template>

<script setup>
const porps = defineProps({
  label: {
    type: String,
    default: "",
  },
});
</script>
