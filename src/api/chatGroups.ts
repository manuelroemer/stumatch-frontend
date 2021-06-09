import { PaginationApiResult } from './apiResult';
import { ApiObject } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface ChatGroup extends ApiObject {
  activeParticipantIds: Array<string>;
}

export function getAllUserChatGroups(userId: string, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<ChatGroup>>(`/api/v1/users/${userId}/chatGroups`, init);
}
