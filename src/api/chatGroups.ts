import { PaginationApiResult } from './apiResult';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface ChatGroup {
  id: string;
  createdOn: string;
  modifiedOn: string;
  activeParticipantIds: Array<string>;
}

export function getAllUserChatGroups(userId: string, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<ChatGroup>>(`/api/v1/users/${userId}/chatGroups`, init);
}
