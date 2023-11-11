export interface IAPIResponse<TData extends any> {
  data: TData;
  errorCode: number;
  message: string | null;
  errors: string | string[] | null;
}

export interface ICursorPagination<TData extends any> {
  items: TData[];
  next_cursor: string | null;
}

export interface IPagination<TData extends any> {
  pages: number;

  page: number;

  total: number;

  data: TData[];
}

export type IPaginationResponse<TData extends any> = IAPIResponse<
  IPagination<TData>
>;

export type ICursorPaginationResponse<TData extends any> = IAPIResponse<
  ICursorPagination<TData>
>;
