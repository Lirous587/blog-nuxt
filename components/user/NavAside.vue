<template>
  <div class="flex flex-col gap-y-5 lg:gap-y-10 flex-shrink-0">
    <UserStatisticsCard
      class="bg-gradient-to-br from-green-200 to-blue-100"
      :data="statisticsData"
    ></UserStatisticsCard>
    <UserIndexRecommendEssay
      class="bg-gradient-to-br from-pink-50 to-green-50"
      :list="recommentEssayList"
    ></UserIndexRecommendEssay>
    <UserIndexLabel
      class="bg-gradient-to-br from-blue-50 to-cyan-100"
      :list="labelList"
    ></UserIndexLabel>
    <UserIndexKind
      class="bg-gradient-to-br from-cyan-100 to-green-50"
      :list="kindList"
    ></UserIndexKind>
  </div>
</template>

<script setup>
import { useMyIndexStore } from "~/store";

const indexStore = useMyIndexStore();
const labelList = indexStore.getLabelList();
const kindList = indexStore.getKindList();
const recommentEssayList = indexStore.getRecommentEssayList();
const statisticsData = indexStore.getStatisticsData();
</script>

<style scoped>
* {
  font-family: "myFont";
}
</style>
