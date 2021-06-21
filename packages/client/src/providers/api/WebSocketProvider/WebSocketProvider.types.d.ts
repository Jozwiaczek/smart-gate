import { ReactNode } from 'react';

import { ConnectionState } from '../../../enums/connectionState.enum';
import { DeviceStatus } from '../../../enums/deviceStatus.enum';

export interface WebSocketContextValue {
  connect: () => Promise<void>;
  disconnect: () => void;
  connectionState: ConnectionState;
  deviceStatus: DeviceStatus;
}

export interface WebSocketProviderProps {
  children: ReactNode;
}
