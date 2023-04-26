import { IMBuilderParamItem } from "../types";

export interface IMParamGroupProps extends IMBuilderParamItem {
  value?: string | boolean | number;
  onChange: (data: string | boolean | number) => void;
  placeholder?: string;
}
