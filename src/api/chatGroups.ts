import { ApiResult, PaginationApiResult } from './apiResult';
import { ChatMessage } from './chatMessages';
import { ApiObject } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';
import { User } from './users';

export interface ChatGroup extends ApiObject {
  activeParticipantIds: Array<string>;
  activeParticipants: Array<User>;
  lastMessage?: ChatMessage;
  unreadMessages: number;
}

export interface ChatGroupPost {
  activeParticipantIds: Array<string>;
}

export function getAllUserChatGroups(userId: string, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<ChatGroup>>(`/api/v1/users/${userId}/chatGroups`, init);
}

export function getChatGroup(id: string, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<ChatGroup>>(`/api/v1/chatGroups/${id}`, init);
}

export function postChatGroup(body: ChatGroupPost, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<ChatGroup>>(`/api/v1/chatGroups`, { method: 'POST', body, ...init });
}
