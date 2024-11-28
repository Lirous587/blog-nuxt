<template>
  <el-select v-model="id" placeholder="选择分类">
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    requirded: true,
  },
});

const id = defineModel("kind_id");
</script>
