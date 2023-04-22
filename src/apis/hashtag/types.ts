import { IPaginationParams, ISearchParams } from "src/common/interfaces";

export interface IHashtagParams extends IPaginationParams, ISearchParams {}

export interface IHashtagRequest {
  name: string;
}

export interface IHashtagResponse {
  _id: string;

  name?: string;

  slug?: string;
}
