<template>
  <el-checkbox-group v-model="ids" class="grid grid-cols-3 gap-2">
    <el-checkbox
      v-for="item in list"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-checkbox-group>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    requirded: true,
  },
});

const ids = defineModel("ids");
</script>
