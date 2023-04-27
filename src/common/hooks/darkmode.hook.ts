import { useCallback, useEffect, useState } from "react";

let initial: boolean = false;

if (typeof window !== "undefined") {
  const element = document.querySelector("body");

  initial = localStorage?.getItem("mode") === "dark";

  if (initial) {
    element?.classList.add("dark");
  } else {
    element?.classList.remove("dark");
  }
}

export const useDarkMode = () => {
  const [isDark, setMode] = useState<boolean | null>(initial);

  const toggleDarkMode = useCallback(() => {
    setMode(!isDark);
  }, [isDark]);

  useEffect(() => {
    const element = document.querySelector("body");
    if (isDark) {
      localStorage.setItem("mode", "dark");
      element?.classList.add("dark");
    } else {
      localStorage.setItem("mode", "light");
      element?.classList.remove("dark");
    }
  }, [isDark]);

  return { isDark, toggleDarkMode };
};
