import { useCopyToClipboard } from "src/common/hooks";
import { ICopyProps } from "./type";

export const CCopy = ({ text, children }: ICopyProps) => {
  const { copy } = useCopyToClipboard(text);

  return (
    <div className="relative">
      <div
        onClick={copy}
        className="absolute top-2 right-2 bg-white dark:bg-black shadow-xl p-2 hover:bg-black dark:hover:bg-white hover:text-slate-200 dark:hover:text-black cursor-pointer rounded"
      >
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </div>
      {children}
    </div>
  );
};
