import { IAPIResponse, IPaginationResponse } from "src/common/interfaces";
import http from "src/utils/axios";
import { IImageParams, IImageRequest, IImageResponse } from "./types";

export const imageAPI = {
  get(params: IImageParams): Promise<IPaginationResponse<IImageResponse>> {
    return http.post("/images/all", { ...params });
  },

  getById(id: string): Promise<IAPIResponse<IImageResponse>> {
    return http.get(`/images/${id}`);
  },

  create(image: IImageRequest): Promise<IAPIResponse<IImageResponse>> {
    return http.post("/images", image);
  },

  update(
    id: string,
    image: IImageRequest
  ): Promise<IAPIResponse<IImageResponse>> {
    return http.put(`/images/${id}`, image);
  },

  delete(id: string): Promise<IAPIResponse<IImageResponse>> {
    return http.delete(`/images/${id}`);
  },
};
