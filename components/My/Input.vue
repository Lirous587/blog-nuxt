<template>
  <el-input
    ref="inpuRef"
    v-model="modelValue"
    :placeholder="placeholder"
    @blur="blur"
    :clearable="clearable"
    :autofocus="autofocus"
    :size="size"
    :type="type"
    :rows="rows"
  >
    <slot></slot>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
  </el-input>
</template>

<script setup>
const inpuRef = ref(null);

const props = defineProps({
  size: {
    type: String,
  },
  placeholder: {
    type: String,
    default: "请输入",
  },
  type: {
    type: String,
    default: "text",
  },
  rows: {
    type: Number,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
});
const modelValue = defineModel("modelValue", {
  type: String,
  required: true,
});

const focus = () => {
  inpuRef.value.focus();
};

const emit = defineEmits(["blur"]);

const blur = () => {
  emit("blur");
};

defineExpose({
  focus,
});
</script>
<style scoped>
:deep(.el-input__wrapper) {
  @apply bg-slate-50 bg-opacity-0;
}
</style>
