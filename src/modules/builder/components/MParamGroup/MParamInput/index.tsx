import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { CInput } from "src/common/components/controls";
import { CButton, CPopover } from "src/common/components/others";

import { IMParamGroupProps } from "../type";
import { Controller, useForm } from "react-hook-form";

export const MParamInput = ({
  label,
  name,
  onChange,
  placeholder,
  value,
}: IMParamGroupProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { [name]: value ?? "" },
  });

  const onSelect = handleSubmit((v) => {
    onChange(v?.[name] || "");
  });

  return (
    <>
      <label className="text-gray-500">
        {label}{" "}
        {value && (
          <span className="text-gray-500">
            {name} {value}
          </span>
        )}
      </label>
      <CPopover
        anchor={<PencilSquareIcon width={18} />}
        className="right-0 origin-top-right absolute z-50 mt-2 w-64 rounded-md dark:bg-gray-900 bg-white border dark:border-gray-900 border-gray-300 transform opacity-100 scale-100"
      >
        <div className="p-3">
          <div>{label}: </div>
          <div className="flex">
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <CInput placeholder={placeholder} {...field} />
              )}
            />
            <CButton className="border-none -mr-2" onClick={onSelect}>
              <CheckCircleIcon width={20} />
            </CButton>
          </div>
        </div>
      </CPopover>
    </>
  );
};
