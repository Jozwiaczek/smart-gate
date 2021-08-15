import { ConnectionState } from '../../../../../enums/connectionState.enum';
import { DeviceStatus } from '../../../../../enums/deviceStatus.enum';

interface GateDisconnectedProps {
  connectionState: ConnectionState;
  deviceStatus: DeviceStatus;
}
