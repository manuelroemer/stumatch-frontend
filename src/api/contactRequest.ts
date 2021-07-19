import { qs } from '../utils/qs';
import { ApiResult, PaginationApiResult } from './apiResult';
import { ApiObject, QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface ContactRequest extends ApiObject {
  name: string;
  email: string;
  type: 'role' | 'featureBug' | 'other';
  message: string;
  status: 'open' | 'inProgress' | 'closed';
}

export interface ContactRequestPost {
  name: string;
  email: string;
  type: 'role' | 'featureBug' | 'other';
  message: string;
}

export interface ContactRequestPut {
  id?: string;
  status?: 'open' | 'inProgress' | 'closed';
}

export function postContactRequest(body: ContactRequestPost, init?: StumatchFetchInit) {
  return stumatchFetch<ContactRequest>(`/api/v1/contactRequests`, { body, method: 'POST', ...init });
}

export function getAllContactRequests(options?: QueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<ContactRequest>>(`/api/v1/contactRequests?${qs(options)}`, init);
}

export function putContactRequest(id: string, body: ContactRequestPut, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<ContactRequest>>(`/api/v1/contactRequests/${id}`, { method: 'PUT', body, ...init });
}
