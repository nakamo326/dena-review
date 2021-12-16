import { io, Socket } from 'socket.io-client';

// export const SERVER_URL = 'wss://murmuring-lowlands-58469.herokuapp.com';
export const SERVER_URL = 'localhost:3001';

export function enterRoom(id: string): Socket | null {
  const socket = io(SERVER_URL, { transports: ['websocket'] });

  socket.on('connect', () => {
    console.log('get connection with server!');
    socket.emit('roomReq', JSON.stringify({ roomId: id }));
  });

  socket.on('error', (e) => {
    console.log('failed to connect server!');
    console.log(e);
    return null;
  });
  return socket;
}
