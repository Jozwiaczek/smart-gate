import * as dotenv from 'dotenv';
import socketClient from 'socket.io-client';

import actionExecutor from './actions/actionExecutor';
import { ActionConfig } from './actions/actions.types';
import actionsConfig from './config/actions.config.json';

dotenv.config();
actionExecutor((actionsConfig as ActionConfig).onInit);

const socket = socketClient(process.env.API_URL ?? '', {
  query: {
    ticket: process.env.AUTH_TICKET,
  },
  reconnection: true,
  reconnectionAttempts: 1000,
  reconnectionDelay: 1000,
});

enum WebSocketEvent {
  CHECK_DEVICE_CONNECTION = 'checkDeviceConnection',
  TOGGLE_GATE = 'toggleGate',
}

socket.on('message', (eventType: WebSocketEvent) => {
  console.log('New message with eventType:', eventType);
  switch (eventType) {
    case WebSocketEvent.TOGGLE_GATE: {
      actionExecutor((actionsConfig as ActionConfig).onToggle);
      break;
    }
    default: {
      console.log('Unsupported event type:', eventType);
      break;
    }
  }
});

socket.on('connect', () => {
  console.log('connected');
});

socket.on('disconnect', () => {
  console.log('disconnect');
});
