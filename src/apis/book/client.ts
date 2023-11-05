import http from "src/utils/axios";

import { IAPIResponse } from "src/common/interfaces";
import { IPublicBookResponse } from './types';


export const bookAPIClient = {
  async get(): Promise<IAPIResponse<IPublicBookResponse>> {
    return http.get("/books/client");
  },

  send(id: string, email: string): Promise<IAPIResponse<any>> {
    return http.put(`/books/send-book/${id}`, { email });
  },
};
