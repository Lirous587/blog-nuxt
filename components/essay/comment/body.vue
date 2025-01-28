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
</script>
