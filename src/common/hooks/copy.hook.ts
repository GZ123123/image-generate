import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDarkMode } from "src/common/hooks";

export const useCopyToClipboard = (text: string) => {
  const { isDark } = useDarkMode();

  const alert = useCallback(
    (text: string) => toast.success(text, { theme: isDark ? "dark" : "light" }),
    [isDark]
  );

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      if (document.execCommand('copy')) {
        alert("success");
      }
    } catch (err) {
    } finally {
      document.body.removeChild(textArea);
    }
  }

  const copy = useCallback(async () => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text.trim());
      return;
    }

    await navigator.clipboard.writeText(text.trim());
    alert("success");
  }, [text, alert]);

  return { copy };
};
