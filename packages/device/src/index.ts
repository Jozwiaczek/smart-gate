import * as dotenv from 'dotenv';
import socketClient from 'socket.io-client';

import actionExecutor from './actions/actionExecutor';
import { ActionConfig } from './actions/actions.types';
import actionsConfig from './config/actions.config.json';
import { Logger } from './utils';

dotenv.config();
actionExecutor((actionsConfig as ActionConfig).onInit);
const logger = new Logger('EventsFactory');

const socket = socketClient(process.env.API_URL ?? '', {
  query: {
    ticket: process.env.AUTH_TICKET,
  },
  reconnection: true,
  reconnectionAttempts: Number.MAX_VALUE,
  reconnectionDelay: 1000,
});

enum WebSocketEvent {
  CHECK_DEVICE_CONNECTION = 'checkDeviceConnection',
  TOGGLE_GATE = 'toggleGate',
}

socket.on('message', (eventType: WebSocketEvent) => {
  logger.log(`New message with eventType: ${eventType}`);
  switch (eventType) {
    case WebSocketEvent.TOGGLE_GATE: {
      actionExecutor((actionsConfig as ActionConfig).onToggle);
      break;
    }
    default: {
      logger.error(`Unsupported event type: ${eventType}`);
      break;
    }
  }
});

socket.on('connect', () => {
  logger.log(`Connected with API`);
});

socket.on('disconnect', () => {
  logger.log(`Disconnect with API`);
});
