import http from "src/utils/axios";

import { IAPIResponse } from "src/common/interfaces";
import {
  IImageResponse,
  IImageUploadResponse,
  IPublicImageParams,
} from "./types";

export const imageAPIClient = {
  get(params: IPublicImageParams): Promise<IAPIResponse<IImageResponse[]>> {
    return http.get(`/images`, { params });
  },

  upload(file: File): Promise<IAPIResponse<IImageUploadResponse>> {
    return http.post(
      "r2/objects",
      { file, bucket_name: "bucket" },
      { headers: { "Content-Type": "multipart/form-data;" } }
    );
  },
};
