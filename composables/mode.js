export const initMode = () => {
  if (localStorage.theme === "light") {
    lightMode();
    return "light";
  } else {
    darkMode();
    return "dark";
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
