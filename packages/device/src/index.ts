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

const socketConnectionLogger = new Logger('SocketConnection');

const socket = socketClient(process.env.API_URL ?? '', {
  auth: {
    ticket: process.env.AUTH_TICKET,
  },
});

socket.on('message', (eventType: WebSocketEvent) => {
  socketConnectionLogger.log(`New message with eventType: ${eventType}`);
  switch (eventType) {
    case WebSocketEvent.TOGGLE_GATE: {
      actionExecutor((actionsConfig as ActionConfig).onToggle);
      break;
    }
    default: {
      socketConnectionLogger.error(`Unsupported event type: ${eventType}`);
      break;
    }
  }
});

let motionInitialised = false;
socket.on('connect', () => {
  socketConnectionLogger.log(`API connected`);
  if (!motionInitialised) {
    initMotion();
    motionInitialised = true;
  }
  void initNgrok(socket);
});

socket.on('disconnect', () => {
  void ngrok.disconnect();
  socketConnectionLogger.log(`API disconnected`);
});
