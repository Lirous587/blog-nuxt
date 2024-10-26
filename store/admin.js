import { defineStore } from "pinia";
import { getIndexInfo } from "~/api/user";

export const useMyAdminStore = defineStore("myAdminStore", () => {
  const labelList = ref([]);
  const kindList = ref([]);

  const updateAll = async () => {
    await getIndexInfo().then((res) => {
      const data = res.data;
      labelList.value = data.labelList;
      kindList.value = data.kindList;
    });
  };

  const getLabelList = () => {
    return labelList.value;
  };
  const getKindList = () => {
    return kindList.value;
  };

  return {
    labelList,
    kindList,
    updateAll,
    getLabelList,
    getKindList,
  };
});
