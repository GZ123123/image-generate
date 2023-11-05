import http from "src/utils/axios";

import { IAPIResponse } from "src/common/interfaces";
import { IBookResponse } from './types';


export const bookAPIClient = {
  async get(): Promise<IAPIResponse<IBookResponse>> {
    return http.get("/books/client");
  },
};
