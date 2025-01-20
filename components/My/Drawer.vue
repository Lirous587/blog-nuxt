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
    <div class="w-full h-full flex flex-col overflow-auto">
      <div class="flex-1">
        <slot />
      </div>
      <div class="mb-3 flex items-center">
        <el-button type="primary" :loading="loading" @click="submit">
          {{ confirmText }}</el-button
        >
        <el-button type="default" @click="close">取 消</el-button>
      </div>
    </div>
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
  confirmText: {
    type: String,
    default: "提交",
  },
});

const visible = ref(false);

const loading = ref(false);

const showLoading = () => (loading.value = true);
const hideLoading = () => (loading.value = false);

const open = () => {
  document.body.style.overflow = "hidden";
  visible.value = true;
};
const close = () => {
  document.body.style.overflow = "";
  visible.value = false;
};

defineExpose({
  showLoading,
  hideLoading,
  open,
  close,
});
</script>
