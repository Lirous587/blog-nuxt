<template>
  <el-dialog align-center v-model="visible">
    <slot />
  </el-dialog>
</template>

<script setup>
const visible = ref(false);

const open = () => {
  visible.value = true;
};
const close = () => {
  visible.value = false;
};

defineExpose({
  open,
  close,
});
</script>
