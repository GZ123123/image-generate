import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CDropdown } from "src/common/components/controls";
import { IMParamGroupProps } from "../type";
import { useMemo } from "react";

export const MParamSelect = ({
  label,
  name,
  value,
  options,
}: IMParamGroupProps) => {
  const _options = useMemo(() => {
    if (!options?.length) {
      return [];
    }

    return options.map((option) => ({
      key: option,
      render: <div className="text-sm">{option}</div>,
    }));
  }, [options, value]);
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
      <CDropdown options={_options}>
        <PencilSquareIcon width={18} />
      </CDropdown>
    </>
  );
};
