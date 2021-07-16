import { User } from './users';
import { qs } from '../utils/qs';
import { PaginationApiResult } from './apiResult';
import { ApiObject, QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';
import { Faculty, StudyProgram } from './faculty';
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
  chatGroupId?: string;
  faculty?: Faculty;
  studyProgram?: StudyProgram;
  minSemester?: number;
  maxSemester?: number;
}

export interface MatchRequestPost {
  id?: string;
  facultyId?: string;
  studyProgramId?: string;
  minSemester?: number;
  maxSemester?: number;
}

export type MatchRequestPut = MatchRequestPost;

export interface MatchRequestAcceptOrDeclinePost {
  accepted: boolean;
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

export function putMatchRequest(id: string, body: MatchRequestPut, init?: StumatchFetchInit) {
  return stumatchFetch<MatchRequest>(`/api/v1/matchRequests/${id}`, { body, method: 'PUT', ...init });
}

export function postMatchRequestAcceptOrDeclinePost(
  id: string,
  body: MatchRequestAcceptOrDeclinePost,
  init?: StumatchFetchInit,
) {
  return stumatchFetch<MatchRequest>(`/api/v1/matchRequests/${id}/acceptOrDecline`, { body, method: 'POST', ...init });
}
