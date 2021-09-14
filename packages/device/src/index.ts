import * as dotenv from 'dotenv';
import socketClient from 'socket.io-client';

import actionExecutor from './actions/actionExecutor';
import { ActionConfig } from './actions/actions.types';
import actionsConfig from './config/actions.config.json';
import { Logger } from './utils';

dotenv.config();
actionExecutor((actionsConfig as ActionConfig).onInit);
const logger = new Logger('SocketConnection');

const socket = socketClient(process.env.API_URL ?? '', {
  auth: {
    ticket: process.env.AUTH_TICKET,
  },
});

logger.log('Initialized');

enum WebSocketEvent {
  CHECK_DEVICE_CONNECTION = 'checkDeviceConnection',
  TOGGLE_GATE = 'toggleGate',
  DEVICE_TURNED_ON = 'deviceTurnedOn',
}

let turnedOnEventSent = false;

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
  logger.log('Connected');
  if (!turnedOnEventSent) {
    socket.emit(WebSocketEvent.DEVICE_TURNED_ON);
    turnedOnEventSent = true;
  }
});

socket.on('disconnect', () => {
  logger.log(`Disconnect`);
});
