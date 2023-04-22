import { IAPIResponse } from "src/common/interfaces";
import http from "src/utils/axios";
import { IPublicParamResponse } from "./type";

export const paramAPIClient = {
  get(): Promise<IAPIResponse<IPublicParamResponse>> {
    return http.get("/params");
  },
};
