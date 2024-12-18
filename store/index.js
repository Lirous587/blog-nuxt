import { defineStore } from "pinia";
import { getIndexInfo } from "~/api/index";

export const useMyIndexStore = defineStore("myIndexStore", () => {
  const ifInit = ref(false);
  const labelList = ref([]);
  const kindList = ref([]);
  const recommentEssayList = ref([]);
  const heartWordsList = ref([]);

  const imgList = ref([]);

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
      recommentEssayList.value = data.essayList;
      labelList.value = data.labelList;
      kindList.value = data.kindList;
      heartWordsList.value = shuffleArray(data.heartWordsList);

      imgList.value = heartWordsList.value.map((o) => o.img);

      statisticsData.label.count = labelList.value.length;
      statisticsData.kind.count = kindList.value.length;
      statisticsData.essay.count = kindList.value.reduce(
        (accumulator, kind) => accumulator + kind.essayCount,
        0
      );
    });

    ifInit.value = true;
  };

  const getInitStatus = () => {
    return ifInit.value;
  };

  const getLabelList = () => {
    return labelList.value;
  };

  const getKindList = () => {
    return kindList.value;
  };

  const getRecommentEssayList = () => {
    return recommentEssayList.value;
  };

  const getHeartWordsList = () => {
    return heartWordsList.value;
  };

  const getImgList = () => {
    return imgList.value;
  };

  const getStatisticsData = () => {
    return statisticsData;
  };

  return {
    ifInit,
    labelList,
    kindList,
    recommentEssayList,
    heartWordsList,
    imgList,
    statisticsData,
    initData,
    getInitStatus,
    getLabelList,
    getKindList,
    getRecommentEssayList,
    getHeartWordsList,
    getImgList,
    getStatisticsData,
  };
});
