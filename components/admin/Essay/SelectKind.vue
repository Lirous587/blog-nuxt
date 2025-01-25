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

const handelChange = (value) => {
  id.value = value;
};

handelChange(id.value | list.value[0].id);
</script>
