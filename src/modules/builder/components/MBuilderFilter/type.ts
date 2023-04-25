import { IFilter } from "src/common/interfaces";

export interface IMBuilderFilterProps {
  value: IFilter[];
  onChange: (data: IFilter[]) => void;
}
