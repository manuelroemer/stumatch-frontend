import { qs } from '../utils/qs';
import { ApiResult, PaginationApiResult } from './apiResult';
import { ApiObject, QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export type UserRole = 'student' | 'admin' | 'advertiser' | 'globalContentManager';

export interface User extends ApiObject {
  email?: string;
  firstName: string;
  lastName: string;
  profileImageBlobId?: string;
  roles: Array<UserRole>;
}

export interface Me extends User {
  email: string;
}

export interface UserPost {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  facultyId?: string;
  studyProgramId?: string;
  immatriculatedOn?: {
    startingSemester?: string;
    startingYear?: number;
  };
  profileImageBlob?: string;
}

export interface UserPut {
  id?: string;
  roles?: Array<UserRole>;
}

export interface UserPut {
  email: string;
  firstName: string;
  lastName: string;
  facultyId?: string;
  studyProgramId?: string;
  immatriculatedOn?: {
    startingSemester?: string;
    startingYear?: number;
  };
}

export function getAllUsers(options?: QueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<User>>(`/api/v1/users?${qs(options)}`, init);
}

export function getUser(id: string, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<User>>(`/api/v1/users/${id}`, init);
}

export function postUser(body: UserPost, init?: StumatchFetchInit) {
  return stumatchFetch<User>(`/api/v1/users`, { body, method: 'POST', ...init });
}

export function putUser(id: string, body: UserPut, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<User>>(`/api/v1/users/${id}`, { method: 'PUT', body, ...init });
}
