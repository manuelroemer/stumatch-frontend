/**
 * The basic result bag for data returned by the REST API.
 */
export interface ApiResult<T> {
  result: T;
}

/**
 * An enhancement of the {@link ApiResult} which provides information
 * about a paginated result using default pagination.
 */
export interface PaginationApiResult<T> extends ApiResult<Array<T>> {
  totalCount: number;
  pages: number;
  page: number;
  pageSize: number;
}

/**
 * An enhancement of the {@link ApiResult} which provides information
 * about a paginated result using cursor pagination.
 */

export interface CursorPaginationApiResult<T, TCursor = unknown> extends ApiResult<Array<T>> {
  cursor: TCursor;
  beforeCursor: TCursor | null;
}
