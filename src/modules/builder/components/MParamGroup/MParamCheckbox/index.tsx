import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CDropdown } from "src/common/components/controls";
import { IMParamGroupProps } from "../type";
import { CSelect } from "src/common/components/controls/CSelect";

export const MParamCheckbox = ({
  label,
  name,
  value,
  onChange,
}: IMParamGroupProps) => {
  return (
    <>
      <label>
        {label} {value && <span className="text-gray-500">{name}</span>}
      </label>
      <CSelect
        options={[
          { label: <div>No</div>, value: false },
          { label: <div>Yes</div>, value: true },
        ]}
        value={value || false}
        onChange={onChange}
      >
        <PencilSquareIcon width={18} />
      </CSelect>
    </>
  );
};
