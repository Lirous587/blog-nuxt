import { defineStore } from "pinia";
import { getIndexPanel } from "~/api/manager";
import { getIndexInfo } from "~/api/user";

export const useMyAdminStore = defineStore("myAdminStore", () => {
  const panelData = ref("");
  const labelList = ref([]);
  const kindList = ref([]);

  const updateAll = async () => {
    await getIndexPanel().then((res) => {
      const data = res.data;
      panelData.value = data;
    });

    await getIndexInfo().then((res) => {
      const data = res.data;
      labelList.value = data.labelList;
      kindList.value = data.kindList;
    });
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
    panelData,
    labelList,
    kindList,
    updateAll,
    getPanelData,
    getLabelList,
    getKindList,
  };
});
