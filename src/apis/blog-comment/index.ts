import { IAPIResponse, IPaginationResponse } from "src/common/interfaces";
import http from "src/utils/axios";
import { IBlogCommentParams, IBlogCommentsResponse, ICreateBlogCommentParams } from './types';

export const blogCommentAPI = {
  get(params: IBlogCommentParams): Promise<IPaginationResponse<IBlogCommentsResponse>> {
    return http.get("/comments", { params });
  },

  create(comment: ICreateBlogCommentParams): Promise<IAPIResponse<{ _id: string }>> {
    return http.post("/comments", comment);
  },

  hidden(id: string): Promise<IAPIResponse<any>> {
    return http.put(`/comments/hidden/${id}`);
  },
};
