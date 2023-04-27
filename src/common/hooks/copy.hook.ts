import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDarkMode } from "src/common/hooks/darkmode.hook";

export const useCopyToClipboard = (text: string) => {
  const { isDark } = useDarkMode();

  const alert = useCallback(
    (text: string) => {
      console.log(isDark ? "dark" : "light");
      toast.success(text, { theme: isDark ? "dark" : "light" });
    },
    [isDark]
  );

  const copy = useCallback(() => {
    navigator.clipboard.writeText(text.trim());
    alert("success");
  }, [text]);

  return { copy };
};
