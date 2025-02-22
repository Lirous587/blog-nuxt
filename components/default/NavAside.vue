<template>
  <div>
    <div
      class="hidden lg:flex flex-col gap-y-5 lg:gap-y-10 flex-shrink-0 font-serif"
    >
      <IndexAuthCard
        class="px-4 pb-6 pt-3 rounded-lg bg-white dark:bg-[rgb(29,30,34)] shadow-sm hover:shadow-lg transition-all duration-300"
      ></IndexAuthCard>
      <IndexLabels
        :list="labels"
        class="px-4 pb-6 pt-3 rounded-lg bg-white dark:bg-[rgb(29,30,34)] shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div class="flex items-center mb-2">
          <span
            class="w-1 h-[0.875rem] inline-block ml-2 mr-1 bg-blue-400"
          ></span>
          <span class="text-blue-500 text-sm">标签云</span>
        </div>
      </IndexLabels>
      <IndexRecommendEssays
        :list="recommentEssays"
        class="px-4 pb-6 pt-3 rounded-lg bg-white dark:bg-[rgb(29,30,34)] shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div class="flex items-center mb-2">
          <span class="w-1 h-[1em] inline-block mx-2 bg-blue-400"></span>
          <span class="text-blue-500">推荐文章</span>
        </div>
      </IndexRecommendEssays>
    </div>
    <div class="block lg:hidden">
      <IndexAuthCard class="mb-3"></IndexAuthCard>
      <el-collapse accordion>
        <el-collapse-item title="导航" name="1">
          <IndexGuide> </IndexGuide>
        </el-collapse-item>
        <el-collapse-item title="标签云" name="2">
          <IndexLabels :list="labels"></IndexLabels>
        </el-collapse-item>
        <el-collapse-item title="推荐文章" name="3">
          <IndexRecommendEssays :list="recommentEssays"></IndexRecommendEssays>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { useMyIndexStore } from "~/store";

const indexStore = useMyIndexStore();
const labels = indexStore.getLabels();
const recommentEssays = indexStore.getRecommentEssays();
</script>

<style scoped>
/* @reference "assets/css/tailwind.css";

* {
  @apply font-serif;
} */
</style>
