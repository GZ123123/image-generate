"use client";

import { classNames } from "src/utils/class-names";
import { IMRadioButton } from "./types";

const getStyles = (value: boolean) => {
  return value
    ? "bg-[#DB0B36] text-white"
    : "dark:bg-gray-700 bg-gray-300 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-black";
};

export const MRadioButtonGroup = ({
  value,
  onChange,
  options,
}: IMRadioButton) => {
  return (
    <div className="text-sm flex justify-between gap-x-2">
      <button
        className={classNames("flex-1 px-2 py-1 rounded-sm", getStyles(!value))}
        onClick={() => onChange(false)}
      >
        {options[0]}
      </button>
      <button
        className={classNames("flex-1 px-2 py-1 rounded-sm", getStyles(value))}
        onClick={() => onChange(true)}
      >
        {options[1]}
      </button>
    </div>
  );
};
