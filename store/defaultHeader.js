import { defineStore } from "pinia";

export const useMyDefaultHeaderStore = defineStore("myScrollBarStore", () => {
  const ifFold = ref(false);

  const getStatus = () => {
    return ifFold.value;
  };

  const fold = () => {
    ifFold.value = true;
  };

  const unfold = () => {
    ifFold.value = false;
  };

  return {
    ifFold,
    getStatus,
    fold,
    unfold,
  };
});
