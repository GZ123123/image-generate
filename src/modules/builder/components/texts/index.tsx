import { CButton } from "src/common/components/others";
import { CDropdown, CInput } from "src/common/components/controls";
import { IMBuilderTextProps } from "./types";
import {
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import uniqueId from "lodash.uniqueid";

export const MBuilderText = ({ value, onChange }: IMBuilderTextProps) => {
  const onAdd = () => {
    onChange(
      value.concat({
        id: uniqueId("text_"),
        value: "",
        exclude: false,
        multiPrompt: false,
      })
    );
  };

  const onRemove = (index: number) => {
    onChange(value.filter((_, _index) => _index !== index));
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-4">
        {value.map((item, index) => (
          <div key={item.id} className="flex">
            <label className="w-full">
              <CInput className="grow" />
            </label>
            {index > 0 && (
              <CButton onClick={() => onRemove(index)} className="border-none">
                <TrashIcon width={20} />
              </CButton>
            )}
            <CDropdown options={[]} className="border-none p-2">
              <PencilSquareIcon width={20} />
            </CDropdown>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <CButton className="w-full border-dashed" onClick={onAdd}>
          <PlusCircleIcon width={18} />
          Add New Text
        </CButton>
      </div>
    </div>
  );
};
