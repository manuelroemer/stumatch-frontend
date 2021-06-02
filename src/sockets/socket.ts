import { createContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export interface SocketContextProps {
  /**
   * The application's shared socket that is connected to the backend.
   *
   * This is `undefined` if no socket connection has been established (yet).
   * This is, for example, the case when no user is authenticated yet.
   */
  socket?: Socket;
}

/**
 * React context for accessing the application's shared socket that is connected to the backend.
 */
export const SocketContext = createContext<SocketContextProps>({});

/**
 * Establishes a WS connection to the backend given the specified token and returns the resulting connected socket.
 *
 * This returns `undefined` if no socket connection has been established (yet).
 * This is, for example, the case when no user is authenticated yet.
 * @param token The token to be used for WS authentication.
 * @returns The connected socket instance once
 */
export function useConnectedSocket(token?: string) {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    if (token) {
      const socket = connectSocket(token);
      socket.on('connect', () => console.info('(Re-)connected to the WS.'));
      socket.on('disconnect', () => console.warn('Disconnected from the WS.'));
      setSocket(socket);
    }

    return () => {
      socket?.disconnect();
    };
  }, [token]);

  return socket;
}

function connectSocket(token: string) {
  const socket = io(WS_BASE_URL, {
    path: '/ws',
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return socket;
}
