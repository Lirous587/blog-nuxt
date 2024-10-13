import { defineStore } from "pinia";

export const useMySearchStore = defineStore("mySearchStore", () => {
  const keyword = ref("");
  const getKeyword = () => {
    return keyword.value;
  };
  const setKeyword = (v: string) => {
    keyword.value = v;
  };
  return {
    keyword,
    getKeyword,
    setKeyword,
  };
});
