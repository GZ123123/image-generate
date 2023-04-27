import { ICategoryResponse } from "src/apis/category/types";
import { IImageResponse } from "src/apis/image/types";

export interface IMResourceDetailPage {
  category: ICategoryResponse;

  images: IImageResponse[];
}
