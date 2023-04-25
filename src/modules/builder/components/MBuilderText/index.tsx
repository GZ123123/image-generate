import {
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import uniqueId from "lodash.uniqueid";

import { CButton, CPopover } from "src/common/components/others";
import { CInput } from "src/common/components/controls";

import { MRadioButtonGroup } from "../MRadioButtonGroup";
import { IMBuilderTextProps } from "./types";
import { MInputGroup } from "../MInputGroup";

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

  const handleChange = (id: string) => {
    return (e: any) => {
      const current = value.find((data) => data?.id === id);

      if (!current) return;

      current.value = e.target.value;

      onChange([...value]);
    };
  };

  const handleRadioChange = (id: string, key: "exclude" | "multiPrompt") => {
    return (_value: boolean) => {
      const current = value.find((data) => data?.id === id);

      if (!current) return;

      current[key] = _value;

      onChange([...value]);
    };
  };

  const handleWeightChange = (id: string) => {
    return (v: number) => {
      const current = value.find((data) => data?.id === id);

      if (!current) return;

      current.weight = v;

      onChange([...value]);
    };
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-4">
        {value.map((item, index) => (
          <div key={item.id} className="flex">
            <label className="w-full flex items-center gap-x-2">
              {item.exclude && (
                <div className="text-gray-500 whitespace-nowrap">--no</div>
              )}
              <CInput value={item.value} onChange={handleChange(item.id)} />
              {!item.exclude && (item.multiPrompt || item.weight) && (
                <div className="text-gray-500 whitespace-nowrap">
                  :: {item.weight && item.weight}
                </div>
              )}
            </label>
            {index > 0 && (
              <CButton onClick={() => onRemove(index)} className="border-none">
                <TrashIcon width={20} />
              </CButton>
            )}
            <CPopover
              anchor={
                <div className="p-1">
                  <PencilSquareIcon width={20} />
                </div>
              }
              className="right-0 origin-top-right absolute z-50 mt-2 w-64 rounded-md dark:bg-gray-800 bg-white border dark:border-gray-900 border-gray-300 transform opacity-100 scale-100"
            >
              {({ close }) => (
                <div className="p-3 flex flex-col gap-y-2">
                  <MRadioButtonGroup
                    options={["Include", "Exculude"]}
                    value={item.exclude}
                    onChange={handleRadioChange(item.id, "exclude")}
                  />
                  {!item.exclude && (
                    <>
                      <MRadioButtonGroup
                        options={["Single-prompt", "Multi-prompt"]}
                        value={item.multiPrompt}
                        onChange={handleRadioChange(item.id, "multiPrompt")}
                      />
                      <div>
                        <MInputGroup
                          value={item.weight}
                          onChange={(_value: number) => {
                            handleWeightChange(item.id)(_value);
                            close();
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </CPopover>
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
