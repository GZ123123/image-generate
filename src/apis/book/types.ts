import { IPaginationParams, ISearchParams } from "src/common/interfaces";

export interface IBookParams extends IPaginationParams, ISearchParams {}

export interface IPublicBookResponse {
  _id: string;

  name: string;

  description: string;

  image_url: string | null;
}

export interface IBooksResponse {
  _id: string;

  name: string;

  image_url: string;

  created_by: string;

  created_date: string;

  modified_by: string;

  modified_date: string;

  is_pin: boolean;
}

export interface IBookResponse extends Omit<IBooksResponse, 'image_url'> {
  description: string;
  url: string;
  image: {
    _id: string;
    name: string;
    url: string;
  }
}

export interface ICreateOrUpdateBookParams  {
  name: string;
  description: string;
  is_pin: boolean;
  url: string;
  image_id: string;
}
