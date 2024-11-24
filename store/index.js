import { defineStore } from "pinia";
import { getIndexInfo } from "~/api/user";

export const useMyIndexStore = defineStore("myIndexStore", () => {
  const ifInit = ref(false);
  const labelList = ref([]);
  const kindList = ref([]);
  const recommentEssayList = ref([]);
  const heartWordsList = ref([]);

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
      recommentEssayList.value = data.essay_list;
      labelList.value = data.label_list;
      kindList.value = data.kind_list;
      heartWordsList.value = data.heart_words_list;
      statisticsData.label.count = labelList.value.length;
      statisticsData.kind.count = kindList.value.length;
      statisticsData.essay.count = kindList.value.reduce(
        (accumulator, kind) => accumulator + kind.essay_count,
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

  const getStatisticsData = () => {
    return statisticsData;
  };

  return {
    ifInit,
    labelList,
    kindList,
    recommentEssayList,
    heartWordsList,
    statisticsData,
    initData,
    getInitStatus,
    getLabelList,
    getKindList,
    getRecommentEssayList,
    getHeartWordsList,
    getStatisticsData,
  };
});
