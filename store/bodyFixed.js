import { defineStore } from "pinia";

export const useMyBodyFiexedStore = defineStore("myScrollBarStore", () => {
  const ifFixed = ref(true);

  const rightBorderWidth = ref("2px");

  const fixed = () => {
    rightBorderWidth.value = "2px";
    ifFixed.value = true;
  };

  const release = () => {
    rightBorderWidth.value = "0px";
    ifFixed.value = false;
  };

  return {
    ifFixed,
    rightBorderWidth,
    fixed,
    release,
  };
});
