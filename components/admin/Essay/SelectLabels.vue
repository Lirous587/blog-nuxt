<template>
  <el-checkbox-group v-model="idsModel" class="grid grid-cols-3 gap-2">
    <el-checkbox
      v-for="item in list"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-checkbox-group>
</template>

<script setup>
import { getEssayLabelList } from "~/api/essay_label";

const idsModel = defineModel("ids", { type: Array, default: [] });
const list = ref([]);

const searchForm = reactive({
  all: true,
});

getEssayLabelList(searchForm).then((res) => {
  const data = res.data;
  list.value = data.list;
});
onMounted(() => {
  if (!idsModel.value) {
    idsModel.value = [];
  }
});
</script>
