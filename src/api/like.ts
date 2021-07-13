import { ApiObject } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface Like extends ApiObject {
  postId: string;
  userId: string;
}

export interface postLike {
  postId: string;
}

export function postLike(body: postLike, init?: StumatchFetchInit) {
  return stumatchFetch<Like>(`/api/v1/posts/likes`, { body, method: 'POST', ...init });
}

export function deleteLike(id: string, init?: StumatchFetchInit) {
  return stumatchFetch(`/api/v1/posts/likes/${id}`, { method: 'DELETE', ...init });
}
