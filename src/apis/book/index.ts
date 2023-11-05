import { IAPIResponse, IPaginationResponse } from "src/common/interfaces";
import http from "src/utils/axios";
import { IBookParams, IBookResponse, IBooksResponse, ICreateOrUpdateBookParams } from './types';

export const bookAPI = {
  get(params: IBookParams): Promise<IPaginationResponse<IBooksResponse>> {
    return http.get("/books", { params });
  },

  getById(id: string): Promise<IAPIResponse<IBookResponse>> {
    return http.get(`/books/${id}`);
  },

  create(book: ICreateOrUpdateBookParams): Promise<IAPIResponse<{ _id: string }>> {
    return http.post("/books", book);
  },

  update(id: string, book: ICreateOrUpdateBookParams): Promise<IAPIResponse<{ _id: string }>> {
    return http.put(`/books/${id}`, book);
  },

  delete(id: string): Promise<IAPIResponse<any>> {
    return http.delete(`/books/${id}`);
  },
};
