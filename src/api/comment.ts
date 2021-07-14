import { qs } from '../utils/qs';
import { PaginationApiResult } from './apiResult';
import { ApiObject, QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface Comment extends ApiObject {
  postId: string;
  authorId: string;
  content: string;
}

export interface CommentPost {
  content: string;
}

export function postComment(id: string, body: CommentPost, init?: StumatchFetchInit) {
  return stumatchFetch<Comment>(`/api/v1/posts/comments/${id}`, { body, method: 'POST', ...init });
}

export function getComments(id: string, options?: QueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<Comment>>(`/api/v1/posts/comments/${id}?${qs(options)}`, init);
}
