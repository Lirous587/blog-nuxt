<template>
  <el-drawer
    :title="title"
    :direction="direction"
    :show-close="false"
    :size="size"
    v-model="visible"
    append-to-body
    @close="close()"
    :close-delay="closeDelay"
    :destroy-on-close="destroyOnClose"
  >
    <slot />
  </el-drawer>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  direction: {
    type: String,
    default: "rtl",
  },
  size: {
    type: String,
    default: "45%",
  },
  close: {
    type: Function,
    default: () => {},
  },
  closeDelay: {
    type: Number,
    default: 250,
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
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
