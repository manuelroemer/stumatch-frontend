import { DependencyList, useContext, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { SocketContext } from './socket';

export type ResourceChangedEventHandler = (event: ResourceChangedEvent) => void;

/**
 * The event structure emitted by the backend when a resource changed.
 */
export interface ResourceChangedEvent {
  resourceType: string;
  changeType: 'changed' | 'deleted';
  id: string;
}

/**
 * Subscribes the given callback to the application's shared websocket and invokes
 * the callback whenever the backend puslishes a {@link ResourceChangedEvent}.
 *
 * Automatically handles the subscription lifetime based on the given dependencies.
 * @param cb The callback to be invoked when a new {@link ResourceChangedEvent} has been received.
 */
export function useResourceChangedEventEffect(cb: ResourceChangedEventHandler, deps?: DependencyList) {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      return subscribeResourceChangedEvent(socket, cb);
    }
  }, [socket, ...(deps ?? [])]);
}

/**
 * Subscribes the given callback to the given socket and listens to
 * {@link ResourceChangedEvent}s published by the backend.
 * @param socket The socket to which to subscribe.
 * @param cb The callback to be invoked when a new {@link ResourceChangedEvent} has been received.
 * @returns A disposer for unsubscribing.
 */
export function subscribeResourceChangedEvent(socket: Socket, cb: ResourceChangedEventHandler): () => void {
  socket.on('resource-changed', cb);
  return () => socket.off('resource-changed', cb);
}
