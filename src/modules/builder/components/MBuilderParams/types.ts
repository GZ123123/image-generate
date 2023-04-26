import { PARAM_TYPE } from "src/common/constants/enum";
import { IParams } from "src/common/interfaces";

export interface IMBuilderParamItem {
  name: string;

  label: string;

  type: PARAM_TYPE;

  options?: string[] | { value: string | number | boolean; label: string }[];

  value?: string | number | boolean;

  placeholder?: string;
}

export interface IMBuilderParamProps {
  params?: IMBuilderParamItem[];
  onChange: (key: string, value: string | number | boolean) => void;
}
