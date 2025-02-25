import { defineStore } from "pinia";

export const useMyBodyFiexedStore = defineStore("myBodyFiexedStore", () => {
  const ifFixed = ref(true);

  const barWidth = ref("2px");

  const fixed = () => {
    ifFixed.value = true;
  };

  const release = () => {
    ifFixed.value = false;
  };

  return {
    ifFixed,
    barWidth,
    fixed,
    release,
  };
});
