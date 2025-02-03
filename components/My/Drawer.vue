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
    :lock-scroll="true"
    :close-on-click-modal="!ifAdminMode"
  >
    <div class="pr-5 h-full flex flex-col overflow-auto">
      <div class="flex-1">
        <slot />
      </div>
      <div v-if="ifAdminMode" class="mb-3 flex items-center">
        <el-button type="primary" :loading="loading" @click="submit">
          {{ confirmText }}</el-button
        >
        <el-button type="default" @click="close">取 消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { useMyBodyFiexedStore } from "./store/bodyFixed";

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
  mode: {
    type: String,
    default: "admin",
  },
});

const visible = ref(false);

const loading = ref(false);

const emit = defineEmits(["submit"]);
const submit = () => emit("submit");

const ifAdminMode = computed(() => {
  return props.mode === "admin";
});

const showLoading = () => (loading.value = true);
const hideLoading = () => (loading.value = false);

const bodyFixedStore = useMyBodyFiexedStore();

const barWidth = bodyFixedStore.barWidth;

const open = () => {
  bodyFixedStore.fixed();
  document.body.style.borderRight = barWidth + " solid transparent";
  document.body.style.overflowY = "hidden";
  visible.value = true;
};
const close = () => {
  bodyFixedStore.release();
  document.body.style.borderRight = "none";
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
