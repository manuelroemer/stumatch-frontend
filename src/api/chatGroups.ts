import { qs } from '../utils/qs';
import { PaginationApiResult } from './apiResult';
import { PaginationQueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface ChatGroup {
  id: string;
  createdOn: string;
  modifiedOn: string;
  activeParticipantIds: Array<string>;
}

export function getAllUserChatGroups(userId: string, options?: PaginationQueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<ChatGroup>>(`/api/v1/users/${userId}/chatGroups?${qs(options)}`, init);
}
