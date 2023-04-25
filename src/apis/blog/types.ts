import { IPaginationParams, ISearchParams } from "src/common/interfaces";
import { IHashtagResponse } from "../hashtag/types";
import { IUserResponse } from "../user/types";

export interface IPublicBlogParams extends IPaginationParams, ISearchParams {}

export interface IBlogParams extends IPaginationParams, ISearchParams {}

export interface IBlogRequest {
  title?: string;

  description?: string;

  content?: string;

  is_public?: boolean;

  hashtag_ids?: string[];
}

export interface IBlogsReponse {
  _id: string;

  title: string;

  description: string;

  is_public: boolean;

  created_by: string;

  created_date: string;

  modified_by: string;

  modified_date: string;

  hashtags: string[];
}

export interface IBlogResponse {
  _id: string;

  title?: string;

  description?: string;

  content?: string;

  is_public?: boolean;

  created_date?: string;

  hashtags?: IHashtagResponse[];
}

export interface IPublicBlogsResponse {
  _id: string;

  slug: string;

  title: string;

  description: string;

  created_date: string;

  hashtags?: IHashtagResponse[];
}

export interface IPublicBlogResponse {
  _id: string;

  slug: string;

  title: string;

  description: string;

  content: string;

  created_date: string;

  author: IUserResponse;

  hashtags?: IHashtagResponse[];

  prev_blog: IPublicBlogsResponse;

  next_blog: IPublicBlogsResponse;
}
