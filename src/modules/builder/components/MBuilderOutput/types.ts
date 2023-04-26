import { IImageResponse } from "src/apis/image/types";
import { IParams, IText } from "src/common/interfaces";

export interface IMBuilderOutputProps {
  texts: IText[];
  filters: IImageResponse[];
  images: string[];
  params: IParams;
  onReset: () => void;
}
