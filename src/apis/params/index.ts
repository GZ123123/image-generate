import { IAPIResponse, IPaginationResponse } from "src/common/interfaces";
import http from "src/utils/axios";
import { IParamPaginationParams, IParamRequest, IParamResponse } from "./type";

export const paramAPI = {
  get(
    params: IParamPaginationParams
  ): Promise<IPaginationResponse<IParamResponse>> {
    return http.post("/params/all", { params });
  },

  getById(id: string): Promise<IAPIResponse<IParamResponse>> {
    return http.get(`/params/${id}`);
  },

  create(param: IParamRequest): Promise<IAPIResponse<IParamResponse>> {
    return http.post("/params", param);
  },

  update(
    id: string,
    param: IParamRequest
  ): Promise<IAPIResponse<IParamResponse>> {
    return http.put(`/params/${id}`, param);
  },

  delete(id: string): Promise<IAPIResponse<IParamResponse>> {
    return http.post(`/params/${id}`);
  },
};
