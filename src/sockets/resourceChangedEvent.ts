import { useContext, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { SocketContext } from './socket';

export type ResourceChangedEventHandler = (event: ResourceChangedEvent) => void;

export interface ResourceChangedEvent {
  resourceType: string;
  changeType: 'changed' | 'deleted';
  id: string;
}

export function useResourceChangedEventEffect(cb: ResourceChangedEventHandler) {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      return subscribeResourceChangedEvent(socket, cb);
    }
  }, [socket]);
}

export function subscribeResourceChangedEvent(socket: Socket, cb: ResourceChangedEventHandler): () => void {
  socket.on('resource-changed', cb);
  return () => socket.off('resource-changed', cb);
}
