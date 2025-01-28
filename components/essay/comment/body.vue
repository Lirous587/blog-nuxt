<template>
  <EssayCommentParents :eid="eid"></EssayCommentParents>
</template>

<script setup>
const props = defineProps({
  eid: {
    type: Number,
    require: true,
  },
});

const list = ref([]);

defineExpose({
  list,
});
</script>
