import { IImageResponse } from "src/apis/image/types";

export interface IMBuilderFilterProps {
  value: IImageResponse[];
  onChange: (data: IImageResponse[]) => void;
}
