<template>
  <div class="flex flex-col gap-y-5 lg:gap-y-10 flex-shrink-0">
    <IndexAuthCard
      v-if="showList.includes('statistics')"
      class="bg-gradient-to-br from-green-200 to-blue-100 dark:from-green-950 dark:to-blue-950"
      :data="statisticsData"
    ></IndexAuthCard>
    <IndexRecommendEssays
      v-if="showList.includes('recommentEssay')"
      class="bg-gradient-to-br from-pink-50 to-green-50 dark:from-pink-950 dark:to-green-950"
      :list="recommentEssayList"
    ></IndexRecommendEssays>

    <IndexGuide
      v-if="showList.includes('friendAndMe')"
      class="lg:hidden bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-slate-800 dark:to-blue-950"
    >
    </IndexGuide>

    <IndexKinds
      v-if="showList.includes('kind')"
      class="bg-gradient-to-br from-cyan-100 to-green-50 dark:from-cyan-950 dark:to-green-950"
      :list="kindList"
    ></IndexKinds>

    <IndexLabels
      v-if="showList.includes('label')"
      class="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950 dark:to-cyan-950"
      :list="labelList"
    ></IndexLabels>
  </div>
</template>

<script setup>
import { useMyIndexStore } from "~/store";

const indexStore = useMyIndexStore();
const labelList = indexStore.getLabelList();
const kindList = indexStore.getKindList();
const recommentEssayList = indexStore.getRecommentEssayList();
const statisticsData = indexStore.getStatisticsData();

const props = defineProps({
  showList: {
    type: Array,
    default: ["statistics", "recommentEssay", "friendAndMe", "label", "kind"],
  },
});
</script>

<style scoped>
@reference "assets/css/tailwind.css";

* {
  @apply font-serif;
}
</style>
