import { qs } from '../utils/qs';
import { ApiResult, PaginationApiResult } from './apiResult';
import { ApiObject, QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';
import { Like } from './like';
import { Comment } from './comment';
import { User } from './users';

export interface Advertisement extends ApiObject {
  title: string;
  content: string;
  author: User;
  status: string;
}

export interface PostAdvertisement extends ApiObject {
  title: string;
  content: string;
  authorId: string;
  category: string;
}

export function getAllAdvertisements(userId: string, options?: QueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<Advertisement>>(`/api/v1/advertisements?${qs(options)}`, init);
}

export function getAdvertisementByID(advertisementId: string, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<Advertisement>>(`/api/v1/advertisements/${advertisementId}`, init);
}

export function getAllCategories(init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<Array<string>>>(`/api/v1/categories`, init);
}

export function PostAdvertisement(body: PostAdvertisement, init?: StumatchFetchInit) {
  return stumatchFetch<Advertisement>(`/api/v1/advertisements`, { body, method: 'POST', ...init });
}
