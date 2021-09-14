import 'dotenv/config';

import ngrok from 'ngrok';
import socketClient from 'socket.io-client';

import actionExecutor from './actions/actionExecutor';
import { ActionConfig } from './actions/actions.types';
import actionsConfig from './config/actions.config.json';
import { WebSocketEvent } from './enums/webSocketEvent.enum';
import initMotion from './initMotion';
import initNgrok from './initNgrok';
import { Logger } from './utils';

actionExecutor((actionsConfig as ActionConfig).onInit);

const logger = new Logger('SocketConnection');

const socket = socketClient(process.env.API_URL ?? '', {
  auth: {
    ticket: process.env.AUTH_TICKET,
  },
});

logger.log('Initialized');

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

let motionInitialised = false;
socket.on('connect', () => {
  logger.log(`API connected`);

  if (!turnedOnEventSent) {
    socket.emit(WebSocketEvent.DEVICE_TURNED_ON);
    turnedOnEventSent = true;
  }

  if (!motionInitialised) {
    initMotion();
    motionInitialised = true;
  }

  void initNgrok(socket);
});

socket.on('disconnect', () => {
  void ngrok.disconnect();
  logger.log(`API disconnected`);
});
