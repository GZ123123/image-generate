import http from "src/utils/axios";

import { IAPIResponse, IPaginationResponse } from "src/common/interfaces";
import { IHashtagParams, IHashtagRequest, IHashtagResponse } from "./types";

export const hashTagAPI = {
  get(params: IHashtagParams): Promise<IPaginationResponse<IHashtagResponse>> {
    return http.get("/hashtags", { params });
  },

  create(hashtag: IHashtagRequest): Promise<IAPIResponse<IHashtagResponse>> {
    return http.post("/hashtags", hashtag);
  },

  update(
    id: string,
    hashtag: IHashtagRequest
  ): Promise<IAPIResponse<IHashtagResponse>> {
    return http.put(`/hashtags/${id}`, hashtag);
  },

  delete(id: string): Promise<IAPIResponse<IHashtagResponse>> {
    return http.delete("/hashtags");
  },
};
