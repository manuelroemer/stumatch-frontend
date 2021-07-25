import { qs } from '../utils/qs';
import { ApiResult, PaginationApiResult } from './apiResult';
import { ApiObject, QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';
import { User } from './users';
import { Faculty } from './faculty';

export interface Advertisement extends ApiObject {
  title: string;
  shortDescription: string;
  content: string;
  author: User;
  facultyId?: string;
  studyProgramId?: string;
  faculty?: Faculty;
  startDate: string;
  endDate: string;
  status: string;
  advertisementImageBlobId: string;
}

export interface PostAdvertisement extends ApiObject {
  title: string;
  shortDescription: string;
  content: string;
  authorId: string;
  facultyId?: string;
  studyProgramId?: string;
  startDate: Date;
  endDate: Date;
  advertisementImageBlob: string;
}

export interface PutAdvertisement {
  title?: string;
  shortDescription?: string;
  content?: string;
  authorId?: string;
  facultyId?: string;
  studyProgramId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  advertisementImageBlob?: string;
}

export function getAllAdvertisements(options?: QueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<Advertisement>>(`/api/v1/advertisements?${qs(options)}`, init);
}

export function getAdvertisementsByUser(userId: string, options?: QueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<Advertisement>>(
    `/api/v1/users/${userId}/advertisements?${qs(options)}`,
    init,
  );
}

export function getAdvertisementByID(advertisementId: string, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<Advertisement>>(`/api/v1/advertisements/${advertisementId}`, init);
}

export function getRandomAdvertisement(init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<Advertisement>>(`/api/v1/feedAdvertisements/random`, init);
}

export function PostAdvertisement(body: PostAdvertisement, init?: StumatchFetchInit) {
  return stumatchFetch<Advertisement>(`/api/v1/advertisements`, { body, method: 'POST', ...init });
}

export function PutAdvertisement(advertisementId: string, body: PutAdvertisement, init?: StumatchFetchInit) {
  return stumatchFetch<Advertisement>(`/api/v1/advertisements/${advertisementId}`, { body, method: 'PUT', ...init });
}

export function deleteAdvertisement(id: string, init?: StumatchFetchInit) {
  return stumatchFetch(`/api/v1/advertisements/${id}`, { method: 'DELETE', ...init });
}
