export const initMode = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    darkMode();
  } else {
    lightMode();
  }
};

export const darkMode = () => {
  document.documentElement.classList.add("dark");
  localStorage.theme = "dark";
};

export const lightMode = () => {
  document.documentElement.classList.remove("dark");
  localStorage.theme = "light";
};
