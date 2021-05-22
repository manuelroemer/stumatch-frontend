import { ApiResult } from './apiResult';
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

export function getUser(id: string, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<GetUserResponseBody>>(`/api/v1/users/${id}`, init);
}

export function getMe(init?: StumatchFetchInit) {
  return getUser('me', init);
}
