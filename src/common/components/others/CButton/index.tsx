import { classNames } from "src/utils/class-names";
import { ICButton } from "./types";

export const CButton = ({ children, className, ...props }: ICButton) => {
  return (
    <button
      {...props}
      className={classNames(
        className,
        "py-1 px-2",
        "flex gap-x-2 items-center",
        "rounded",
        "border-black border-[1px]",
        "dark:border-white"
      )}
    >
      {children}
    </button>
  );
};
