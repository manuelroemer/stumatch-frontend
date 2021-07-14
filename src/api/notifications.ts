import { qs } from '../utils/qs';
import { PaginationApiResult } from './apiResult';
import { ApiObject, QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface BaseNotification<NotificationType extends string> extends ApiObject {
  userId: string;
  type: NotificationType;
  seen?: boolean | null;
}

export interface TextNotification extends BaseNotification<'text'> {
  title?: string;
  content?: string;
}
export interface AcceptedMatchRequestNotification extends BaseNotification<'matchRequestAcceptedByPartner'> {
  matchRequestId: string;
}

export interface DeclinedMatchRequestNotification extends BaseNotification<'matchRequestDeclinedByPartner'> {
  matchRequestId: string;
}

export interface FriendRequestAcceptedNotification extends BaseNotification<'matchRequestAccepted'> {
  friendsListEntryId: string;
}

export interface FoundMatchNotification extends BaseNotification<'matchRequestFoundMatch'> {
  matchRequestId: string;
}

export type Notification =
  | TextNotification
  | AcceptedMatchRequestNotification
  | DeclinedMatchRequestNotification
  | FriendRequestAcceptedNotification
  | FoundMatchNotification;

export interface NotificationPut {
  id?: string;
  seen: boolean;
}

export function getAllUserNotifications(userId: string, options?: QueryOptions, init?: StumatchFetchInit) {
  return stumatchFetch<PaginationApiResult<Notification>>(`/api/v1/users/${userId}/notifications?${qs(options)}`, init);
}

export function putNotification<Result = Notification>(id: string, body: NotificationPut, init?: StumatchFetchInit) {
  return stumatchFetch<Result>(`/api/v1/notifications/${id}`, { body, method: 'PUT', ...init });
}

export function deleteNotification(id: string, init?: StumatchFetchInit) {
  return stumatchFetch(`/api/v1/notifications/${id}`, { method: 'DELETE', ...init });
}
