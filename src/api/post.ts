import { qs } from '../utils/qs';
import { PaginationApiResult } from './apiResult';
import { ApiObject, QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';
import { User } from './users';

export interface Post extends ApiObject {
  title: string;
  content: string;
  author: User;
  likes: number;
  comments: number;
  categories: string[];
}

export function getAllPosts(userId: string, options?: QueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<Post>>(`/api/v1/posts?${qs(options)}`, init);
}
