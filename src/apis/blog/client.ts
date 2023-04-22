import http from "src/utils/axios";

import { IAPIResponse, IPaginationResponse } from "src/common/interfaces";
import {
  IPublicBlogParams,
  IPublicBlogResponse,
  IPublicBlogsResponse,
} from "./types";

export const blogAPIClient = {
  get(
    params: IPublicBlogParams
  ): Promise<IPaginationResponse<IPublicBlogsResponse>> {
    return http.get("/blogs/client", { params });
  },

  getBySlug(slug: string): Promise<IAPIResponse<IPublicBlogResponse>> {
    return http.get(`blogs/client/${slug}`);
  },
};
