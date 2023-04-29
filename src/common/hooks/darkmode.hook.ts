import { useCallback, useMemo } from "react";
import { useLocalStorage } from ".";

const setBodyMode = (mode: boolean) => {
  const element = document.querySelector("body");

  if (!element) {
    return;
  }

  if (mode && !element.classList.contains("dark")) {
    element.classList.add("dark");
  } else if (element.classList.contains("dark")) {
    element.classList.remove("dark");
  }
};

if (typeof window !== "undefined") {
  const initial = JSON.parse(localStorage?.getItem("mode") || "") === "dark";
  setBodyMode(initial);
}

export const useDarkMode = () => {
  const [mode, setMode] = useLocalStorage("mode");

  const isDark = useMemo(() => mode === "dark", [mode]);

  const toggleDarkMode = useCallback(() => {
    setMode(mode !== "dark" ? "dark" : "light");
    setBodyMode(mode !== "dark");
  }, [mode]);

  return { isDark, toggleDarkMode };
};
