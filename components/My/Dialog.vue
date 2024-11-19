<template>
  <el-dialog :title="title" :width="width" align-center v-model="visible">
    <slot />
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  width: {
    type: String,
    default: "45%",
  },
});

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
