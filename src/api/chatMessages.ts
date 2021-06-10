import { ApiResult } from './apiResult';
import { ApiObject } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface ChatMessage extends ApiObject {
  chatGroupId: string;
  userId: string;
  textContent: string;
  isDeleted: boolean;
}

export function getAllChatGroupChatMessages(chatGroupId: string, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<Array<ChatMessage>>>(`/api/v1/chatGroups/${chatGroupId}/chatMessages`, init);
}
