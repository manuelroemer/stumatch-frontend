import { User } from './users';
import { qs } from '../utils/qs';
import { PaginationApiResult } from './apiResult';
import { ApiObject, QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';
export interface MatchRequest extends ApiObject {
  partner?: User;
  status:
    | 'pending'
    | 'acceptedByMe'
    | 'accepted'
    | 'acceptedByPartner'
    | 'declinedByMe'
    | 'declinedByPartner'
    | 'matched';
}

export interface MatchRequestPost {
  id?: string;
  facultyId?: string;
  studyProgramId?: string;
  minSemester?: number;
  maxSemester?: number;
}

export function getAllUserMatchRequests(userId: string, options?: QueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<MatchRequest>>(`/api/v1/users/${userId}/matchRequests?${qs(options)}`, init);
}

export function deleteMatchRequest(id: string, init?: StumatchFetchInit) {
  return stumatchFetch(`/api/v1/matchRequests/${id}`, { method: 'DELETE', ...init });
}

export function postMatchRequest(body: MatchRequestPost, init?: StumatchFetchInit) {
  return stumatchFetch<MatchRequest>(`/api/v1/matchRequests`, { body, method: 'POST', ...init });
}
