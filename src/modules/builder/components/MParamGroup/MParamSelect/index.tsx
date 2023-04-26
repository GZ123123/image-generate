import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CDropdown } from "src/common/components/controls";
import { IMParamGroupProps } from "../type";
import { useMemo } from "react";
import { CSelect } from "src/common/components/controls/CSelect";

export const MParamSelect = ({
  label,
  name,
  value,
  options,
  onChange,
}: IMParamGroupProps) => {
  const _options = useMemo(() => {
    if (!options?.length) {
      return [];
    }

    return options.map((option) => ({
      label: (
        <div className="text-sm">
          {typeof option === "string" ? option : option.label}
        </div>
      ),
      value: typeof option === "string" ? option : option.value,
    }));
  }, [options, value]);

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
      <CSelect value={value} options={_options} onChange={onChange}>
        <PencilSquareIcon width={18} />
      </CSelect>
    </>
  );
};
