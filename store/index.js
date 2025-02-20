import { defineStore } from "pinia";
import { getIndexInfo } from "~/api";

export const useMyIndexStore = defineStore("myIndexStore", () => {
  const ifInit = ref(false);
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
  });

  const initData = async () => {
    ifInit.value = false;

    await getIndexInfo().then((res) => {
      const data = res.data;
      labels.value = data.labels;
      recommendEssays.value = data.recommendEssays;
      heartWords.value = shuffleArray(data.heartWords);
      carousels.value = shuffleArray(data.carousels);

      statisticsData.label.count = labels.value.length;
      // statisticsData.essay.count = kinds.value.reduce(
      //   (accumulator, kind) => accumulator + kind.essayCount,
      //   0
      // );
    });

    ifInit.value = true;
  };

  const getInitStatus = () => {
    return ifInit.value;
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
    recommendEssays,
    heartWords,
    carousels,
    statisticsData,
    initData,
    getInitStatus,
    getLabels,
    getRecommentEssays,
    getHeartWords,
    getCarousels,
    getStatisticsData,
  };
});
