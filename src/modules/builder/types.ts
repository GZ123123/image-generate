import { ICategoryResponse } from "src/apis/category/types";
import { IImageParams, IImageResponse } from "src/apis/image/types";
import { IParamResponse } from "src/apis/params/type";

export interface IMBuilderPageProps {
  categories: ICategoryResponse[];

  images?: IImageResponse[];

  params?: IParamResponse[];

  onSearch: (params: IImageParams) => void;
}
