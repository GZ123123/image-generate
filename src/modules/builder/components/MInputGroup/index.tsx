import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { CInput } from "src/common/components/controls";

export const MInputGroup = ({ value, onChange }: any) => {
  const ref = useRef(null);

  const handleClick = () => {
    const _value = ref.current?.["value"];

    if (!_value) return onChange("");

    if (!isNaN(_value)) return onChange(_value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return handleClick();
    }
  };

  return (
    <CInput
      ref={ref}
      className="w-[100%]"
      defaultValue={value}
      onKeyDown={handleKeyDown}
      prepend={
        <div className="pl-2 flex items-center text-gray-500 select-none cursor-text text-sm">
          Weight:
        </div>
      }
      append={
        <button
          className="pr-2 text-gray-500 hover:text-[#DB0B36]"
          onClick={handleClick}
        >
          <span className="sr-only">Add Weight</span>
          <CheckCircleIcon width={20} />
        </button>
      }
    />
  );
};
