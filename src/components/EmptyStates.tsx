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
