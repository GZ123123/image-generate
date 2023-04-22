import { IPaginationParams, ISearchParams } from "src/common/interfaces";
import { ICategoryResponse } from "../category/types";

export interface IPublicImageParams extends ISearchParams {
  category_id: string;
}

export interface IImageParams extends IPaginationParams, ISearchParams {}

export interface IImageRequest {
  name?: string;

  key?: string;

  category_id?: string;

  url?: string;
}

export interface IImageResponse {
  _id: string;

  name?: string;

  key?: string;

  url?: string;

  category?: ICategoryResponse;
}
