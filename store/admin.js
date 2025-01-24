import { defineStore } from "pinia";
import { getIndexInfo } from "~/api";

export const useMyAdminStore = defineStore("myAdminStore", () => {
  const ifInit = ref(false);
  const labelList = ref([]);
  const kindList = ref([]);

  const getInitStatus = () => {
    return ifInit.value;
  };

  const updateAll = async () => {
    ifInit.value = false;

    const getKindListAndLabelList = new Promise((resolve, reject) => {
      getIndexInfo()
        .then((res) => {
          const data = res.data;
          labelList.value = data.labelList;
          kindList.value = data.kindList;
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });

    const task = [getKindListAndLabelList];
    await Promise.all(task);
    ifInit.value = true;
  };

  const getLabelList = () => {
    return labelList.value;
  };

  const getKindList = () => {
    return kindList.value;
  };

  return {
    ifInit,
    labelList,
    kindList,
    getInitStatus,
    updateAll,
    getLabelList,
    getKindList,
  };
});
