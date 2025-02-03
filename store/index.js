import { defineStore } from "pinia";
import { getIndexInfo } from "~/api";

export const useMyIndexStore = defineStore("myIndexStore", () => {
  const ifInit = ref(false);
  const kinds = ref([]);
  const labels = ref([]);
  const recommendEssays = ref([]);
  const heartWords = ref([]);
  const carousels = ref([]);

  const statisticsData = reactive({
    essay: {
      name: "文章",
      count: 0,
    },
    label: {
      name: "标签",
      count: 0,
    },
    kind: {
      name: "分类",
      count: 0,
    },
  });

  const initData = async () => {
    ifInit.value = false;

    await getIndexInfo().then((res) => {
      const data = res.data;
      kinds.value = data.kinds;
      labels.value = data.labels;
      recommendEssays.value = data.recommendEssays;
      heartWords.value = shuffleArray(data.heartWords);
      carousels.value = shuffleArray(data.carousels);

      statisticsData.label.count = labels.value.length;
      statisticsData.kind.count = kinds.value.length;
      statisticsData.essay.count = kinds.value.reduce(
        (accumulator, kind) => accumulator + kind.essayCount,
        0
      );
    });

    ifInit.value = true;
  };

  const getInitStatus = () => {
    return ifInit.value;
  };

  const getKinds = () => {
    return kinds.value;
  };

  const getLabels = () => {
    return labels.value;
  };

  const getRecommentEssays = () => {
    return recommendEssays.value;
  };

  const getHeartWords = () => {
    return heartWords.value;
  };

  const getCarousels = () => {
    return carousels.value;
  };

  const getStatisticsData = () => {
    return statisticsData;
  };

  return {
    ifInit,
    labels,
    kinds,
    recommendEssays,
    heartWords,
    carousels,
    statisticsData,
    initData,
    getInitStatus,
    getKinds,
    getLabels,
    getRecommentEssays,
    getHeartWords,
    getCarousels,
    getStatisticsData,
  };
});
