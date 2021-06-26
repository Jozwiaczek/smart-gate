import * as dotenv from 'dotenv';
import socketClient from 'socket.io-client';

dotenv.config();

const socket = socketClient(process.env.API_URL ?? '', {
  query: {
    ticket: process.env.AUTH_TICKET,
  },
  reconnection: true,
  reconnectionAttempts: 1000,
  reconnectionDelay: 1000,
});

socket.on('connect', () => {
  console.log('connected');
});

socket.on('disconnect', () => {
  console.log('disconnect');
});
