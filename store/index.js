import { defineStore } from "pinia";
import { getIndexInfo } from "~/api";

export const useMyIndexStore = defineStore("myIndexStore", () => {
  const ifInit = ref(false);
  const labels = ref([]);
  const recommendEssays = ref([]);
  const heartWords = ref([]);
  const carousels = ref([]);

  const initData = async () => {
    ifInit.value = false;

    await getIndexInfo().then((res) => {
      const data = res.data;
      labels.value = data.labels;
      recommendEssays.value = data.recommendEssays;
      heartWords.value = shuffleArray(data.heartWords);
      carousels.value = shuffleArray(data.carousels);
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

  return {
    ifInit,
    labels,
    recommendEssays,
    heartWords,
    carousels,
    initData,
    getInitStatus,
    getLabels,
    getRecommentEssays,
    getHeartWords,
    getCarousels,
  };
});
