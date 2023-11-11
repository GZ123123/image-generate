import http from "src/utils/axios";

import { ICursorPaginationResponse } from "src/common/interfaces";
import { IPublicBlogCommentParams, IPublicBlogCommentsResponse } from './types';


export const blogCommentAPIClient = {
  async get(
    blogId: string,
    params: IPublicBlogCommentParams,
  ): Promise<ICursorPaginationResponse<IPublicBlogCommentsResponse>> {
    return http.get(`/comments/client/${blogId}`, {
      params,
    });
  },
};
