import { Button } from '@chakra-ui/react';
import EmptyState, { EmptyStateProps } from './EmptyState';
import accessDenied from '../assets/access-denied.svg';
import { useHistory } from 'react-router';
import socialSerenity from '../assets/social-serenity.svg';

export function AccessDeniedEmptyState(props?: EmptyStateProps) {
  const history = useHistory();

  return (
    <EmptyState
      imgSrc={accessDenied}
      title="Access Denied"
      description="You do not have the required privileges to access this page."
      actions={
        <Button colorScheme="primary" onClick={() => history.goBack()}>
          Go Back
        </Button>
      }
      {...props}
    />
  );
}

export function NoNotificationsEmptyState(props?: EmptyStateProps) {
  return (
    <EmptyState
      imgSrc={socialSerenity}
      title="No Notifications"
      description="You have no notifications at the moment."
      {...props}
    />
  );
}

export function NoMatchRequestsEmptyState(props?: EmptyStateProps) {
  return (
    <EmptyState
      imgSrc={socialSerenity}
      title="No Match Requests"
      description="You have no match requests at the moment."
      {...props}
    />
  );
}

export function NoContactRequestsEmptyState(props?: EmptyStateProps) {
  return (
    <EmptyState
      imgSrc={socialSerenity}
      title="No Contact Requests"
      description="You have no contact requests at the moment."
      {...props}
    />
  );
}

export function NoChatMessagesEmptyState(props?: EmptyStateProps) {
  return (
    <EmptyState
      imgSrc={socialSerenity}
      title="No Messages"
      description="This is the beginning of your conversation."
      {...props}
    />
  );
}

export function NoChatGroupsEmptyState(props?: EmptyStateProps & { emptyDueToFiltering: boolean }) {
  return (
    <EmptyState
      imgSrc={socialSerenity}
      title="No Chats"
      description={
        props?.emptyDueToFiltering
          ? 'Your filter does not match any conversations.'
          : 'You have not started a conversation with anyone yet.'
      }
      {...props}
    />
  );
}

export function NoChatGroupSelectedEmptyState(props?: EmptyStateProps) {
  return (
    <EmptyState
      imgSrc={socialSerenity}
      title="No Chat Group Selected"
      description="Select a chat group on the left to start chatting."
      {...props}
    />
  );
}

export function NoPostsEmptyState(props?: EmptyStateProps) {
  return (
    <EmptyState imgSrc={socialSerenity} title="No Posts" description="There are no posts at the moment." {...props} />
  );
}

export function NoCommentsEmptyState(props?: EmptyStateProps) {
  return (
    <EmptyState
      imgSrc={socialSerenity}
      title="No Comments"
      description="There are no comments at the moment."
      {...props}
    />
  );
}

export function NoAdvertisementsEmptyState(props?: EmptyStateProps) {
  return (
    <EmptyState
      imgSrc={socialSerenity}
      title="No Advertisements"
      description="There are no advertisements at the moment."
      {...props}
    />
  );
}
