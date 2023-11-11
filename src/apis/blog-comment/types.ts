import { IPaginationParams, ISearchParams } from "src/common/interfaces";

export interface IPublicBlogCommentParams {
  size: number;

  comment_id?: string;

  parent_id?: string;
}

export interface IBlogCommentParams extends IPaginationParams, ISearchParams {
  blog_id?: string;
}

export interface IBlogCommentsResponse {
  _id: string;

  blog_name: string;

  content: string;

  created_by: string;

  created_date: string;

  fullname: string;

  email: string;

  is_hidden: boolean;
}

export interface IPublicBlogCommentsResponse 
  extends Pick<IBlogCommentsResponse, '_id' | 'content' | 'created_date' | 'fullname'> {
  child_comments: number;
}

export interface ICreateBlogCommentParams  {
  fullname: string;
  email: string;
  profile_url?: string;
  content: string;
  parent_id?: string;
  blog_id: string;
}
