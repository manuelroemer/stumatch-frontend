import { ApiResult } from './apiResult';
import { ApiObject } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';
import { User } from './users';

export interface FriendsListEntry extends ApiObject {
  friendId: string;
  friend: User;
}

export function getAllUserFriendsListEntries(userId: string, init?: StumatchFetchInit) {
  return stumatchFetch<ApiResult<Array<FriendsListEntry>>>(`/api/v1/users/${userId}/friendsListEntries`, init);
}

export function deleteFriendsListEntry(id: string, init?: StumatchFetchInit) {
  return stumatchFetch(`/api/v1/friendsListEntries/${id}`, { method: 'DELETE', ...init });
}
