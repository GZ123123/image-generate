import { IAPIResponse } from "src/common/interfaces";
import http from "src/utils/axios";
import { ICategoryResponse } from "./types";

export const categoryAPIClient = {
  get(params: any): Promise<IAPIResponse<ICategoryResponse[]>> {
    return http.get("/categories", { params });
  },
};
