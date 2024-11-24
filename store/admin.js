import { defineStore } from "pinia";
import { getIndexPanel } from "~/api/admin";
import { getIndexInfo } from "~/api/user";

export const useMyAdminStore = defineStore("myAdminStore", () => {
  const ifInit = ref(false);
  const panelData = ref("");
  const labelList = ref([]);
  const kindList = ref([]);

  const getInitStatus = () => {
    return ifInit.value;
  };

  const updateAll = async () => {
    ifInit.value = false;
    const getPanel = new Promise((resolve, reject) => {
      getIndexPanel()
        .then((res) => {
          const data = res.data;
          panelData.value = data;
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });

    const getKindListAndLabelList = new Promise((resolve, reject) => {
      getIndexInfo()
        .then((res) => {
          const data = res.data;
          labelList.value = data.label_list;
          kindList.value = data.kind_list;
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });

    const task = [getPanel, getKindListAndLabelList];
    await Promise.all(task);
    ifInit.value = true;
  };

  const getPanelData = () => {
    return panelData.value;
  };

  const getLabelList = () => {
    return labelList.value;
  };

  const getKindList = () => {
    return kindList.value;
  };

  return {
    ifInit,
    panelData,
    labelList,
    kindList,
    getInitStatus,
    updateAll,
    getPanelData,
    getLabelList,
    getKindList,
  };
});
