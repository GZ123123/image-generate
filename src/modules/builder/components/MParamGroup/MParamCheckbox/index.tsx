import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CDropdown } from "src/common/components/controls";
import { IMParamGroupProps } from "../type";

export const MParamCheckbox = ({ label, name, value }: IMParamGroupProps) => {
  return (
    <>
      <label>
        {label} {value && <span className="text-gray-500">{name}</span>}
      </label>
      <CDropdown
        options={[
          { key: "true", render: <div>Yes</div> },
          { key: "false", render: <div>No</div> },
        ]}
      >
        <PencilSquareIcon width={18} />
      </CDropdown>
    </>
  );
};
