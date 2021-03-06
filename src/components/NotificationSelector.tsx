import { HTMLChakraProps } from '@chakra-ui/react';
import { Notification } from '../api/notifications';
import { useDeleteNotificationMutation, usePutNotificationMutation } from '../queries/notifications';
import { useConfetti } from '../utils/useConfetti';
import NotificationTemplate, { NotificationTemplateProps } from './NotificationTemplate';

export interface NotificationSelectorProps extends HTMLChakraProps<'div'> {
  notification: Notification;
}

/**
 * The {@link NotificationSelector} is the bridge which contains the logic for converting
 * a {@link Notification} resource coming from the API to a rich and interactive
 * {@link NotificationTemplate} that can be rendered.
 *
 * It essentially converts the raw data structure of the {@link Notification} resource
 * into a visual component and handles events so that the notification is correctly
 * mutated in the backend.
 * The notification itself must still be provided to the component.
 */
export default function NotificationSelector({ notification, ...rest }: NotificationSelectorProps) {
  const markAsReadMutation = usePutNotificationMutation(notification.id, { seen: true });
  const markAsUnreadMutation = usePutNotificationMutation(notification.id, { seen: false });
  const deleteMutation = useDeleteNotificationMutation(notification.id);
  const { show, confetti } = useConfetti();
  const baseNotificationTemplateProps = {
    date: notification.createdOn,
    seen: notification.seen ?? false,
    isMarking: markAsReadMutation.isLoading || markAsUnreadMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
    onMarkAsRead: markAsReadMutation.mutate,
    onMarkAsUnread: markAsUnreadMutation.mutate,
    onDelete: deleteMutation.mutate,
    title: notification.title,
    content: notification.content,
    ...rest,
  } as const;

  const getNotificationTemplateProps = (): NotificationTemplateProps => {
    switch (notification.type) {
      case 'text':
        return {
          ...baseNotificationTemplateProps,
          emoji: '💬',
          onClick: undefined,
        };
      case 'matchRequestAcceptedByPartner':
        return {
          ...baseNotificationTemplateProps,
          emoji: '🥳',
          onClick: undefined,
        };
      case 'matchRequestDeclinedByPartner':
        return {
          ...baseNotificationTemplateProps,
          emoji: '😢',
          onClick: undefined,
        };
      case 'matchRequestAccepted':
        return {
          ...baseNotificationTemplateProps,
          emoji: '👫',
          onClick: show,
        };
      case 'matchRequestFoundMatch':
        return {
          ...baseNotificationTemplateProps,
          emoji: '👋',
          onClick: undefined,
        };
      default:
        console.warn(
          `Received unknown notification type ${(notification as any).type}. The type must be added to the component.`,
        );

        return {
          ...baseNotificationTemplateProps,
          title: 'Unknown Notification Type',
          content: 'Unknown Notification Type',
          onClick: undefined,
          emoji: '❓',
        };
    }
  };

  return (
    <>
      <NotificationTemplate {...getNotificationTemplateProps()} />
      {confetti}
    </>
  );
}
