export interface ApiResult<T> {
  result: T;
}

export interface PaginationApiResult<T> extends ApiResult<Array<T>> {
  totalCount: number;
  pages: number;
  page: number;
  pageSize: number;
}
