import { Center, HStack, Spinner } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface LoadingOverlayProps {
  show: boolean;
  children?: ReactNode;
}

/**
 * Renders a global loading spinner spanning the entire browser window.
 * Gives the user feedback that the page is working while it's preparing
 * to be shown.s
 */
export default function LoadingOverlay({ show, children }: LoadingOverlayProps) {
  return (
    <>
      {show ? (
        <Center layerStyle="fullPageOverlay" bg="white">
          <HStack>
            <Spinner emptyColor="gray.200" color="primary.500" size="xl" />
          </HStack>
        </Center>
      ) : (
        children
      )}
    </>
  );
}
