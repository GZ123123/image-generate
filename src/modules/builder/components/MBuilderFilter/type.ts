import { IImageResponse } from "src/apis/image/types";

export interface IMBuilderFilterProps {
  initialCategory: string;
  value: IImageResponse[];
  onChange: (data: IImageResponse[]) => void;
}
