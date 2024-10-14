<template>
  <div v-for="essay in list" :key="essay.id">
    {{ essay }}
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>

<style></style>
