import React, { useContext, useMemo } from 'react';

import { ToggleSlider } from '../../../../../elements';
import { ConnectionState } from '../../../../../enums/connectionState.enum';
import { DeviceStatus } from '../../../../../enums/deviceStatus.enum';
import { WebSocketContext } from '../../../../../providers/api/WebSocketProvider/WebSocketProvider.context';
import GateDisconnected from './components/GateDisconnected';
import { ToggleSliderWrapper } from './TogglingSection.styled';

const TogglingSection = () => {
  const { toggleGate, connectionState, deviceStatus } = useContext(WebSocketContext);

  const isConnected = useMemo(
    () => connectionState === ConnectionState.CONNECTED && deviceStatus === DeviceStatus.CONNECTED,
    [connectionState, deviceStatus],
  );

  if (isConnected) {
    return (
      <ToggleSliderWrapper>
        <ToggleSlider onToggle={toggleGate} />
      </ToggleSliderWrapper>
    );
  }

  return <GateDisconnected connectionState={connectionState} deviceStatus={deviceStatus} />;
};

export default TogglingSection;
