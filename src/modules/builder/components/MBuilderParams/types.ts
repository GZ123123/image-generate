import { PARAM_TYPE } from "src/common/constants/enum";
import { IParams } from "src/common/interfaces";

export interface IMBuilderParamItem {
  name: string;

  label: string;

  type: PARAM_TYPE;

  options?: string[];
}

export interface IMBuilderParamProps {
  value: IParams;
  params?: IMBuilderParamItem[];
  onChange: (data: IParams) => void;
}
