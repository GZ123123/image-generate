import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { IMParamGroupProps } from "../type";
import { CSelect } from "src/common/components/controls/CSelect";
import { classNames } from "src/utils/class-names";

export const MParamCheckbox = ({
  label,
  name,
  value,
  onChange,
}: IMParamGroupProps) => {
  return (
    <>
      <label>
        <span
          className={classNames(
            value ? "text-black dark:text-white font-semibold" : "text-gray-500"
          )}
        >
          {label}{" "}
        </span>{" "}
        {value && <span className="text-gray-500">{name}</span>}
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
