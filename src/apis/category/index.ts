import http from "src/utils/axios";
import { IAPIResponse, IPaginationResponse } from "src/common/interfaces";
import { ICategoryRequest, ICategoryResponse } from "./types";

export const categoryAPI = {
  get(params: any): Promise<IPaginationResponse<ICategoryResponse>> {
    return http.post("/categories/all", { ...params });
  },

  getById(id: string): Promise<IAPIResponse<ICategoryResponse>> {
    return http.get(`/categories/${id}`);
  },

  create(category: ICategoryRequest): Promise<IAPIResponse<ICategoryResponse>> {
    return http.post("/categories", category);
  },

  update(
    id: string,
    category: ICategoryRequest
  ): Promise<IAPIResponse<ICategoryResponse>> {
    return http.put(`/categories/${id}`, category);
  },

  delete(id: string): Promise<IAPIResponse<ICategoryResponse>> {
    return http.delete(`/categories/${id}`);
  },
};
