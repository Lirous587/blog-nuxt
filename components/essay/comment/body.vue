<template>
  <EssayCommentParents ref="parentsRef" :eid="eid"></EssayCommentParents>
</template>

<script setup>
const props = defineProps({
  eid: {
    type: Number,
    require: true,
  },
});

const parents = ref([]);

const parentsRef = ref(null);

onMounted(() => {
  parents.value = parentsRef.value.list;
});

defineExpose({
  parents,
});
</script>
