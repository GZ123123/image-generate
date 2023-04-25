import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { CInput } from "src/common/components/controls";
import { CButton, CPopover } from "src/common/components/others";

import { IMParamGroupProps } from "../type";

export const MParamInput = ({ label, name, value }: IMParamGroupProps) => {
  return (
    <>
      <label>
        {label}{" "}
        {value && (
          <span className="text-gray-500">
            {name} {value}
          </span>
        )}
      </label>
      <CPopover
        anchor={<PencilSquareIcon width={18} />}
        className="right-0 origin-top-right absolute z-50 mt-2 w-64 rounded-md dark:bg-gray-800 bg-white border dark:border-gray-900 border-gray-300 transform opacity-100 scale-100"
      >
        <div className="p-3">
          <div>{name}</div>
          <div className="flex">
            <CInput value={value as any} />
            <CButton className="border-none -mr-2">
              <CheckCircleIcon width={20} />
            </CButton>
          </div>
        </div>
      </CPopover>
    </>
  );
};
