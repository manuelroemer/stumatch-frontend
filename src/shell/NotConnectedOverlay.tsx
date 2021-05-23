import { Box, Center, chakra, Heading, VStack, Text } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { timeoutAfter } from '../api/fetch';
import { getStatus } from '../api/status';
import serverDown from '../assets/server-down.svg';

export interface NotConnectedOverlayProps {
  children?: ReactNode;
}

export default function NotConnectedOverlay({ children }: NotConnectedOverlayProps) {
  const isConnected = useIsConnected();
  return (
    <>
      <Box display={isConnected ? undefined : 'none'}>{children}</Box>
      {!isConnected && (
        <Center layerStyle="fullPageOverlay">
          <VStack maxW="md" p="8">
            <chakra.img mb="8" src={serverDown} alt="Server Down" />
            <Heading as="h1" w="100%">
              Backend Unreachable
            </Heading>
            <Text>
              We are sorry, but we cannot reach our servers at the moment. We will automatically try to reconnect.
              Please stay patient!
            </Text>
          </VStack>
        </Center>
      )}
    </>
  );
}

function useIsConnected(interval = 5000) {
  const [isConnected, setIsConnected] = useState(true);

  // For the moment, use simple polling to the status endpoint for determining whether the backend is reachable.
  // The used bandwidth is very small, so we can get away with polling over a longer time.
  // TODO: This could nontheless be replaced with a better approach in the future (e.g. websockets).
  useEffect(() => {
    let tid: NodeJS.Timeout;

    const retry = async () => {
      try {
        await getStatus({ signal: timeoutAfter(interval) });
        setIsConnected(true);
      } catch (e) {
        setIsConnected(false);
      }

      tid = setTimeout(retry, interval);
    };

    retry();
    return () => clearTimeout(tid);
  }, []);

  return isConnected;
}
