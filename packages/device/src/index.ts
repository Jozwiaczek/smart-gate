import socketClient from 'socket.io-client';

const socket = socketClient('ws://localhost:3030');

socket.on('connection', () => {
  console.log('test');
});
