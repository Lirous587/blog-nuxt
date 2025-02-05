<template>
  <div class="pr-5">
    <el-card shadow="always">
      <template #header>
        <div class="flex justify-between">
          <span class="text-sm">关键字排行</span>
          <div>
            <el-check-tag
              v-for="(item, index) in options"
              :key="index"
              :checked="currentTag == item.value"
              @click="handerlChoose(item.value)"
              type="primary"
              style="margin-right: 8px"
            >
              {{ item.text }}
            </el-check-tag>
          </div>
        </div>
      </template>

      <!-- 表格 -->
      <div class="h-[300px]"></div>
    </el-card>

    <el-card shadow="always" class="mt-10">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-sm">用户访问量</span>
          <el-tag type="danger" effect="plain"> 用户访问量 </el-tag>
        </div>
      </template>

      <div class="grid grid-cols-3 gap-4 h-[200px]">
        <div
          v-for="(item, index) in visitedCount"
          class="flex flex-col items-center justify-center"
          :key="index"
        >
          <span class="text-xl mb-2 text-gray-500 dark:text-neutral-200">{{
            item.count
          }}</span>
          <span class="text-sm text-gray-500 dark:text-neutral-200">{{
            item.period
          }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const options = [
  {
    text: "年排行",
    value: "year",
  },
  {
    text: "月排行",
    value: "month",
  },
  {
    text: "周排行",
    value: "week",
  },
];
const visitedCount = ref([
  {
    period: "用户年访问量",
    count: 0,
  },
  {
    period: "用户月访问量",
    count: 0,
  },
  {
    period: "用户周访问量",
    count: 0,
  },
]);

const keywordRank = reactive({
  year: {},
  month: {},
  week: {},
});
const currentTag = ref("year");

const getData = () => {};

const handerlChoose = (tag) => {
  currentTag.value = tag;
  changeTimeTag(tag);
};

function changeTimeTag(tag) {
  const tagData = keywordRank[tag];
  const xList = tagData.x;
  const yList = tagData.y;

  let option = {
    xAxis: {
      data: xList,
    },
    yAxis: {},
    legend: {
      data: ["搜索次数"],
    },
    series: [
      {
        name: "搜索次数",
        type: "bar",
        data: yList,
        label: {
          show: true,
          position: "top",
        },
        itemStyle: {
          color: "#59c4e6",
        },
        barWidth: 30,
        selectedMode: true,
        select: {
          itemStyle: {
            color: "#edafda",
          },
        },
      },
    ],
  };
}
</script>
