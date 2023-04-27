import { classNames } from "src/utils/class-names";
import { ICButton } from "./types";

export const CButton = ({ children, className, ...props }: ICButton) => {
  return (
    <button
      {...props}
      className={classNames(
        className,
        "py-0.5 px-2 flex gap-x-2 items-center rounded text-gray-500",
        "dark:border-[#131621] border-gray-300 border-[1px]"
      )}
    >
      {children}
    </button>
  );
};
