import { createContext } from 'react';

import { ConnectionState } from '../../../enums/connectionState.enum';
import { DeviceStatus } from '../../../enums/deviceStatus.enum';
import { WebSocketContextValue } from './WebSocketProvider.types';

export const WebSocketContext = createContext<WebSocketContextValue>({
  connect: () => Promise.resolve(),
  disconnect: () => {},
  connectionState: ConnectionState.DISCONNECTED,
  deviceStatus: DeviceStatus.UNKNOWN,
});
