import { Box, Center } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { timeoutAfter } from '../api/fetch';
import { getStatus } from '../api/status';
import serverDown from '../assets/server-down.svg';
import EmptyState from '../components/EmptyState';

export interface NotConnectedOverlayProps {
  children?: ReactNode;
}

/**
 * A full-page overlay which automatically becomes visible when the app
 * loses the connection to the backend.
 * The overlay notifies the user about this scenario using an apology error message.
 */
export default function NotConnectedOverlay({ children }: NotConnectedOverlayProps) {
  const isConnected = useIsConnected();
  return (
    <>
      <Box display={isConnected ? undefined : 'none'} h="100%">
        {children}
      </Box>
      {!isConnected && (
        <Center layerStyle="fullPageOverlay">
          <EmptyState
            imgSrc={serverDown}
            title="Backend Unreachable"
            description="We are sorry, but we cannot reach our servers at the moment.
              We will automatically try to reconnect. Please stay patient!"
          />
        </Center>
      )}
    </>
  );
}

function useIsConnected(interval = 5000) {
  const [isConnected, setIsConnected] = useState(true);

  // For the moment, use simple polling to the status endpoint for determining whether the backend is reachable.
  // The used bandwidth is very small, so we can get away with polling over a longer time (especially with HTTP2).
  // Also, it's a prototype, so whatever. :)
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
