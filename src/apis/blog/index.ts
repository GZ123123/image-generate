import { IAPIResponse, IPaginationResponse } from "src/common/interfaces";
import http from "src/utils/axios";
import {
  IBlogParams,
  IBlogRequest,
  IBlogResponse,
  IBlogsReponse,
} from "./types";

export const blogAPI = {
  get(params: IBlogParams): Promise<IPaginationResponse<IBlogsReponse>> {
    return http.get("/blogs", { params });
  },

  getByIg(id: string): Promise<IAPIResponse<IBlogResponse>> {
    return http.get(`/blogs/${id}`);
  },

  create(blog: IBlogRequest): Promise<IAPIResponse<IBlogResponse>> {
    return http.post("/blogs", blog);
  },

  update(id: string, blog: IBlogRequest): Promise<IAPIResponse<IBlogResponse>> {
    return http.put(`/blogs/${id}`, blog);
  },

  delete(id: string): Promise<IAPIResponse<IBlogResponse>> {
    return http.delete(`/blogs/${id}`);
  },
};
