import { PARAM_TYPE } from "src/common/constants/enum";
import { IMParamGroupProps } from "./type";
import { MParamCheckbox } from "./MParamCheckbox";
import { MParamInput } from "./MParamInput";
import { MParamSelect } from "./MParamSelect";

export const MParamGroup = ({ type, ...props }: IMParamGroupProps) => {
  return (
    <div className="flex justify-between px-4 py-2 border-b border-gray-300 dark:border-gray-600">
      {(() => {
        switch (type) {
          case PARAM_TYPE.BOOLEAN:
            return <MParamCheckbox type={type} {...props} />;
          case PARAM_TYPE.INPUT_RADIO:
            return <MParamInput type={type} {...props} />;
          case PARAM_TYPE.SELECT:
            return <MParamSelect type={type} {...props} />;
        }
      })()}
    </div>
  );
};
