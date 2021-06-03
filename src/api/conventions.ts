export const me = 'me';

export interface PaginationQueryOptions {
  page?: number;
  pageSize?: number;
}

export interface SortQueryOptions {
  sort?: string;
}

export interface QueryOptions extends PaginationQueryOptions, SortQueryOptions {}
