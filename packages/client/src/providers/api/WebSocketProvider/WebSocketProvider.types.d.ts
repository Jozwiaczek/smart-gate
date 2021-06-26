import { ReactNode } from 'react';

import { ConnectionState } from '../../../enums/connectionState.enum';
import { DeviceStatus } from '../../../enums/deviceStatus.enum';

export interface WebSocketContextValue {
  connect: () => Promise<void>;
  disconnect: () => void;
  connectionState: ConnectionState;
  deviceStatus: DeviceStatus;
  toggleGate: () => void;
}

export interface WebSocketProviderProps {
  children: ReactNode;
}
