import http from "src/utils/axios";

import { IAPIResponse, IPaginationResponse } from "src/common/interfaces";
import {
  IPublicBlogParams,
  IPublicBlogResponse,
  IPublicBlogsResponse,
} from "./types";

export const blogAPIClient = {
  async get(
    params: IPublicBlogParams
  ): Promise<IPaginationResponse<IPublicBlogsResponse>> {
    try {
      return http.get("/blogs/client", {
        params: { ...params, pages: 0, size: 10 },
      });
    } catch (err) {
      return {
        data: {
          pages: 0,
          page: 0,
          total: 0,
          data: [],
        },
        errorCode: 0,
        message: "",
        errors: "",
      };
    }
  },

  getBySlug(slug: string): Promise<IAPIResponse<IPublicBlogResponse>> {
    return http.get(`blogs/client/${slug}`);
  },

  getByHashtag(
    slug: string,
    params: IPublicBlogParams
  ): Promise<IPaginationResponse<IPublicBlogsResponse>> {
    return http.get(`/blogs/client/hashtag/${slug}`, {
      params: { ...params, pages: 0, size: 10 },
    });
  },
};
