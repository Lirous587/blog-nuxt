<template>
  <div class="select-none flex flex-col gap-y-5 lg:gap-y-10 flex-shrink-0">
    <IndexAuthCard
      class="!rounded-2xl"
      v-if="showList.includes('statistics')"
      :data="statisticsData"
    ></IndexAuthCard>
    <IndexRecommendEssays
      class="!rounded-2xl"
      v-if="showList.includes('recommentEssay')"
      :list="recommentEssays"
    ></IndexRecommendEssays>

    <IndexGuide class="!rounded-2xl" v-if="showList.includes('friendAndMe')">
    </IndexGuide>

    <IndexLabels
      class="!rounded-2xl"
      v-if="showList.includes('label')"
      :list="labels"
    ></IndexLabels>
  </div>
</template>

<script setup>
import { useMyIndexStore } from "~/store";

const indexStore = useMyIndexStore();
const labels = indexStore.getLabels();
const recommentEssays = indexStore.getRecommentEssays();
const statisticsData = indexStore.getStatisticsData();

const props = defineProps({
  showList: {
    type: Array,
    default: ["statistics", "recommentEssay", "friendAndMe", "label"],
  },
});
</script>

<style scoped>
@reference "assets/css/tailwind.css";

* {
  @apply font-serif;
}
</style>
