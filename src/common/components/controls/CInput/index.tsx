import { forwardRef } from "react";
import { ICInputProps } from "./types";
import { classNames } from "src/utils/class-names";

const CInput = forwardRef<HTMLInputElement, ICInputProps<HTMLInputElement>>(
  ({ id, label, append, prepend, className, error, ...props }, ref) => {
    return (
      <div className={classNames("input-group w-full")}>
        {/* LABEL */}
        {label && (
          <label className="capitalize" htmlFor={id}>
            {label}
          </label>
        )}
        {/* INPUT */}
        <div
          className={classNames(
            className,
            "flex items-stretch rounded truncate",
            "border",
            error?.message
              ? "border-pink-600"
              : "border-gray-300 dark:border-gray-600"
          )}
        >
          {/* PREPEND */}
          {prepend && (
            <div
              className={classNames("prepend flex items-center bg-transparent")}
            >
              {prepend}
            </div>
          )}
          <input
            ref={ref}
            {...props}
            id={id}
            className={classNames(
              "w-[100%]",
              "py-1 px-2",
              "border-none shadow-none outline-none bg-transparent"
            )}
          />
          {/* APPEND */}
          {append && (
            <div className={"append flex items-center bg-transparent"}>
              {append}
            </div>
          )}
        </div>
        {/* STATUS */}
      </div>
    );
  }
);

export { CInput };
