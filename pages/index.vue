<template>
  <div class="my-5 flex">
    <div
      v-if="loading"
      class="hidden flex-shrink-0 lg:w-[350px] md:w-[250px] md:flex md:flex-col gap-4 ml-5"
    >
      <UserIndexEssay :list="recommentEssayList"></UserIndexEssay>
      <UserIndexLabel :list="labelList"></UserIndexLabel>
      <UserIndexKind :list="kindList"></UserIndexKind>
    </div>

    <div>
      <UserEssayList :list="essayList"></UserEssayList>
    </div>
  </div>
</template>

<script setup>
import { getIndexInfo } from "~/api/user";
const essayList = ref([]);
const labelList = ref([]);
const kindList = ref([]);
const loading = ref(false);
const recommentEssayList = ref([]);

const getIndexData = async () => {
  await getIndexInfo().then((res) => {
    recommentEssayList.value = res.data.essayList;
    labelList.value = res.data.labelList;
    kindList.value = res.data.kindList;
    loading.value = true;
  });
};
await getIndexData();
</script>
