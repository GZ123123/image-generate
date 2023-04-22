import http from "src/utils/axios";

import { IAPIResponse } from "src/common/interfaces";
import { IImageResponse, IPublicImageParams } from "./types";

export const imageAPIClient = {
  get(params: IPublicImageParams): Promise<IAPIResponse<IImageResponse[]>> {
    return http.get(`/images`, { params });
  },
};
