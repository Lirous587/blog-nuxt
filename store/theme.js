import { defineStore } from "pinia";

export const useMyThemeStore = defineStore("myThemeStore", () => {
  const theme = ref("dark");

  const initMode = () => {
    if (localStorage.theme === "light") {
      lightMode();
    } else {
      darkMode();
    }
  };

  const darkMode = () => {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    theme.value = "dark";
  };

  const lightMode = () => {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    theme.value = "light";
  };

  const getMode = () => {
    return theme;
  };

  return {
    theme,
    initMode,
    getMode,
    darkMode,
    lightMode,
  };
});
