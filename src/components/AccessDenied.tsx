import { Button } from '@chakra-ui/react';
import EmptyContent from './EmptyContent';
import accessDenied from '../assets/access-denied.svg';
import { useHistory } from 'react-router';

export default function AccessDenied() {
  const history = useHistory();

  return (
    <EmptyContent
      imgSrc={accessDenied}
      imgAlt="Access Denied"
      title="Access Denied"
      description="You do not have the required privileges to access this page."
      actions={
        <Button colorScheme="primary" onClick={() => history.goBack()}>
          Go Back
        </Button>
      }
    />
  );
}
