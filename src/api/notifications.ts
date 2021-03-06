import { qs } from '../utils/qs';
import { PaginationApiResult } from './apiResult';
import { ApiObject, QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface Notification extends ApiObject {
  userId: string;
  type:
    | 'text'
    | 'matchRequestAcceptedByPartner'
    | 'matchRequestDeclinedByPartner'
    | 'matchRequestAccepted'
    | 'matchRequestFoundMatch';
  seen?: boolean | null;
  title: string;
  content: string;
}

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
