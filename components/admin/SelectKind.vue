<template>
  <el-select v-model="id" placeholder="选择分类" @change="handelChange">
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
  id: {
    type: Number,
  },
});

const id = ref(props.id | props.list[0].id);

const emits = defineEmits(["update"]);

const handelChange = (value) => {
  emits("update", value);
};

handelChange(id.value);
</script>
