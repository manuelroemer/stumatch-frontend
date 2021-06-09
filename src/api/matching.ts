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

export function getAllUserMatchRequests(userId: string, options?: QueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<MatchRequest>>(`/api/v1/users/${userId}/matchRequests?${qs(options)}`, init);
}

export function deleteMatchRequest(id: string, init?: StumatchFetchInit) {
  return stumatchFetch(`/api/v1/matchRequests/${id}`, { method: 'DELETE', ...init });
}
