<template>
  <div class="py-5">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="ml-[10%] mr-[10%]" v-if="classifyList.length > 0">
          <UserIndexClassify :list="classifyList"></UserIndexClassify>
          <UserIndexKind class="mt-5" :list="kindList"></UserIndexKind>
        </div>
      </el-col>
      <el-col :span="18"> </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getIndexInfo } from "~/api/user";

const classifyList = ref([]);
const kindList = ref([]);

const getIndexData = () => {
  getIndexInfo().then((res) => {
    const menu = res.data.menu;
    if (Array.isArray(menu)) {
      menu.forEach((o) => {
        classifyList.value.push(...o.classifyList);
        kindList.value.push(o.kind);
      });
    }
  });
};
getIndexData();
</script>
