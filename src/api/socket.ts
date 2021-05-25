import io from 'socket.io-client';

export function connectSocket(token: string) {
  const socket = io('ws://localhost:4040', {
    path: '/ws',
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return socket;
}
