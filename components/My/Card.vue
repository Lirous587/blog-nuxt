<template>
  <el-card :shadow="shadow">
    <template v-if="$slots.header" #header>
      <slot name="header"> </slot>
    </template>
    <slot></slot>
    <template v-if="$slots.footer" #footer>
      <slot name="footer"> </slot>
    </template>
  </el-card>
</template>

<script setup>
const props = defineProps({
  shadow: {
    type: String,
    default: "hover",
  },
});
</script>

<style scoped>
.el-card__body {
  padding: 0 !important;
}
:deep(el-card__header) {
  @apply !border-none bg-white dark:!bg-black  dark:!text-neutral-200;
}
.el-card,
.el-card__header,
.el-card__body,
.el-card__footer {
  @apply !border-none bg-white dark:!bg-black  dark:!text-neutral-200;
}
</style>
