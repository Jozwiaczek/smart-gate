import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { ConnectionState } from '../../../../../../enums/connectionState.enum';
import { DeviceStatus } from '../../../../../../enums/deviceStatus.enum';
import {
  DeviceDisconnectedIcon,
  DisconnectedWiresIcon,
  ServerDisconnectedIcon,
} from '../../../../../../icons';
import {
  DisconnectedBody,
  DisconnectedContainer,
  DisconnectedIcons,
  DisconnectedTitle,
  DisconnectedWiredWrapper,
} from '../TogglingSection.styled';
import { GateDisconnectedProps } from '../TogglingSection.types';

const GateDisconnected = ({ connectionState, deviceStatus }: GateDisconnectedProps) => {
  const { t } = useTranslation();
  const isDeviceDisconnected = deviceStatus === DeviceStatus.DISCONNECTED;
  const isServerDisconnected = connectionState === ConnectionState.DISCONNECTED;

  return (
    <DisconnectedContainer>
      <DisconnectedWiredWrapper>
        <DisconnectedWiresIcon />
      </DisconnectedWiredWrapper>
      <DisconnectedTitle>
        {t('routes.dashboard.sections.toggling.gateDisconnected.title')}
      </DisconnectedTitle>
      <DisconnectedBody>
        <Trans i18nKey="routes.dashboard.sections.toggling.gateDisconnected.description" />
      </DisconnectedBody>
      <DisconnectedIcons>
        {isServerDisconnected && <ServerDisconnectedIcon />}
        {isDeviceDisconnected && <DeviceDisconnectedIcon />}
      </DisconnectedIcons>
    </DisconnectedContainer>
  );
};

export default GateDisconnected;
