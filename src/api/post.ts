import { qs } from '../utils/qs';
import { ApiResult, PaginationApiResult } from './apiResult';
import { ApiObject, QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';
import { Like } from './like';
import { Comment } from './comment';
import { User } from './users';

export interface Post extends ApiObject {
  title: string;
  content: string;
  author: User;
  likes: Array<Like>;
  comments: Array<Comment>;
  category: string;
  postImageBlobId: string;
}

export interface PostPost extends ApiObject {
  title: string;
  content: string;
  authorId: string;
  category: string;
  postImageBlob: string;
}

export function getAllPosts(userId: string, options?: QueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<Post>>(`/api/v1/posts?${qs(options)}`, init);
}

export function getPostByID(postId: string, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<Post>>(`/api/v1/posts/${postId}`, init);
}

export function getAllCategories(init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<Array<string>>>(`/api/v1/categories`, init);
}

export function PostPost(body: PostPost, init?: StumatchFetchInit) {
  return stumatchFetch<Post>(`/api/v1/posts`, { body, method: 'POST', ...init });
}
