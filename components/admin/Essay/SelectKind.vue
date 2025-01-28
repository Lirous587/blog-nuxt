<template>
  <el-select v-model="id" placeholder="选择分类" @change="handleChange">
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>

<script setup>
import { getEssayKindList } from "~/api/essay_kind";

const id = defineModel("id", {
  type: Number,
  required: true,
});

const list = ref([]);

const searchForm = reactive({
  all: true,
});

await getEssayKindList(searchForm).then((res) => {
  const data = res.data;
  list.value = data.list;
});

const handleChange = (value) => {
  id.value = value;
};

handleChange(id.value | list.value[0].id);
</script>
