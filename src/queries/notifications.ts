import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteNotification, NotificationPut, putNotification } from '../api/notifications';
import { QueryOptions } from '../api/conventions';
import { getAllUserNotifications } from '../api/notifications';
import { useResourceChangedEventEffect } from '../sockets/resourceChangedEvent';

const key = 'notifications';

export function useGetAllUserNotificationsQuery(userId: string, options?: QueryOptions) {
  return useQuery([key, userId, options], () => getAllUserNotifications(userId, options).then((res) => res.data));
}

export function usePutNotificationMutation(id: string, body: NotificationPut) {
  const client = useQueryClient();
  return useMutation(() => putNotification(id, body).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(key),
  });
}

export function useDeleteNotificationMutation(id: string) {
  const client = useQueryClient();
  return useMutation(() => deleteNotification(id).then((res) => res.data), {
    onSuccess: () => client.invalidateQueries(key),
  });
}

export function useNotificationsSocketQueryInvalidation() {
  const queryClient = useQueryClient();
  useResourceChangedEventEffect((event) => {
    if (event.resourceType === 'notification') {
      queryClient.invalidateQueries('notifications');
    }
  });
}
