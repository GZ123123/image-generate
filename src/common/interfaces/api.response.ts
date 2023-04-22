export interface IAPIResponse<TData extends any> {
  data: TData;
  errorCode: number;
  message: string | null;
  errors: string | string[] | null;
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
