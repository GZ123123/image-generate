import { IParams } from "src/common/interfaces";

export interface IMBuilderParamProps {
  value: IParams;
  onChange: (data: IParams) => void;
}
