import { qs } from '../utils/qs';
import { PaginationApiResult } from './apiResult';
import { QueryOptions } from './conventions';
import { stumatchFetch, StumatchFetchInit } from './fetch';

export interface BaseNotification<NotificationType extends string> {
  id: string;
  createdOn: string;
  modifiedOn: string;
  userId: string;
  type: NotificationType;
  seen?: boolean | null;
}

export interface TextNotification extends BaseNotification<'text'> {
  title?: string;
  content?: string;
}

export type Notification = TextNotification;

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