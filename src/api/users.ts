import { ApiResult, PaginationApiResult } from './apiResult';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export type UserRole = 'user' | 'admin';

export interface GetUserResponseBody {
  id: string;
  email: string;
  displayName: string;
  createdOn: string;
  modifiedOn: string;
  roles: Array<UserRole>;
}

export function getAllUsers(init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<GetUserResponseBody>>('/api/v1/users', init);
}

export function getUser(id: string, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<GetUserResponseBody>>(`/api/v1/users/${id}`, init);
}

export function getMe(init?: StumatchFetchInit) {
  return getUser('me', init);
}
