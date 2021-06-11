import { qs } from '../utils/qs';
import { ApiResult, PaginationApiResult } from './apiResult';
import { ApiObject, QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export type UserRole = 'student' | 'admin' | 'advertiser' | 'globalContentManager';

export interface User extends ApiObject {
  email?: string;
  firstName: string;
  lastName: string;
  roles: Array<UserRole>;
}

export interface Me extends User {
  email: string;
}

export function getAllUsers(options?: QueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<User>>(`/api/v1/users?${qs(options)}`, init);
}

export function getUser(id: string, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<User>>(`/api/v1/users/${id}`, init);
}
