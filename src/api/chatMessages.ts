import { qs } from '../utils/qs';
import { CursorPaginationApiResult } from './apiResult';
import { ApiObject, CursorPaginationQueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface ChatMessage extends ApiObject {
  chatGroupId: string;
  userId: string;
  textContent: string;
  isDeleted: boolean;
}

export function getAllChatGroupChatMessages(
  chatGroupId: string,
  options?: CursorPaginationQueryOptions,
  init?: StumatchFetchInit,
) {
  return stumatchFetch<CursorPaginationApiResult<ChatMessage, string>>(
    `/api/v1/chatGroups/${chatGroupId}/chatMessages?${qs(options)}`,
    init,
  );
}
