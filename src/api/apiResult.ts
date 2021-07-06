export interface ApiResult<T> {
  result: T;
}

export interface PaginationApiResult<T> extends ApiResult<Array<T>> {
  totalCount: number;
  pages: number;
  page: number;
  pageSize: number;
}

export interface CursorPaginationApiResult<T, TCursor = unknown> extends ApiResult<Array<T>> {
  cursor: TCursor;
  beforeCursor: TCursor | null;
}
