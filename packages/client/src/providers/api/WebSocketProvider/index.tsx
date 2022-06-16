import React, { useCallback, useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

import { ConnectionState } from '../../../enums/connectionState.enum';
import { DeviceStatus } from '../../../enums/deviceStatus.enum';
import { WebSocketEvent } from '../../../enums/webSocketEvent.enum';
import { useAuth, useCurrentUser } from '../../../hooks';
import { WebSocketContext } from './WebSocketProvider.context';
import { WebSocketProviderProps } from './WebSocketProvider.types';

const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [socket, setSocket] = useState<Socket>();
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    ConnectionState.DISCONNECTED,
  );
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>(DeviceStatus.UNKNOWN);
  const { generateTicket } = useAuth();
  const [currentUser] = useCurrentUser();

  const connect = useCallback(async () => {
    if (
      connectionState === ConnectionState.CONNECTING ||
      connectionState === ConnectionState.CONNECTED
    ) {
      return;
    }
    const ticket = await generateTicket();

    setConnectionState(ConnectionState.CONNECTING);
    const apiSocket = socketIOClient(process.env.REACT_APP_API_URL ?? '', {
      auth: {
        ticket,
      },
      query: {
        ticket,
      },
    });

    apiSocket.on('connect', () => {
      setConnectionState(ConnectionState.CONNECTED);
      apiSocket.emit(WebSocketEvent.CHECK_DEVICE_CONNECTION);
    });

    apiSocket.on('disconnect', () => {
      setConnectionState(ConnectionState.DISCONNECTED);
      setDeviceStatus(DeviceStatus.UNKNOWN);
    });

    apiSocket.on(WebSocketEvent.CHECK_DEVICE_CONNECTION, (isConnected: boolean) => {
      if (isConnected && deviceStatus !== DeviceStatus.CONNECTED) {
        setDeviceStatus(DeviceStatus.CONNECTED);
      } else if (!isConnected && deviceStatus !== DeviceStatus.DISCONNECTED) {
        setDeviceStatus(DeviceStatus.DISCONNECTED);
      }
    });

    setSocket(apiSocket);
  }, [connectionState, deviceStatus, generateTicket]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(undefined);
      setConnectionState(ConnectionState.DISCONNECTED);
    }
  }, [socket]);

  useEffect(() => {
    if (currentUser) {
      void connect();
    }
  }, [connect, currentUser]);

  useEffect(
    () => () => {
      disconnect();
    },
    [disconnect],
  );

  const toggleGate = useCallback(() => {
    if (socket) {
      socket.emit(WebSocketEvent.TOGGLE_GATE);
    }
  }, [socket]);

  return (
    <WebSocketContext.Provider
      value={{ connect, disconnect, deviceStatus, connectionState, toggleGate }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
