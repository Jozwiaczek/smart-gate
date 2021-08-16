import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Tooltip } from '../../../../../../elements';
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
      <h3>{t('routes.dashboard.sections.toggling.gateDisconnected.title')}</h3>
      <DisconnectedBody>
        <Trans i18nKey="routes.dashboard.sections.toggling.gateDisconnected.description" />
      </DisconnectedBody>
      <DisconnectedIcons>
        {isServerDisconnected && (
          <Tooltip
            label={t('routes.dashboard.sections.toggling.gateDisconnected.serverDisconnected')}
          >
            <ServerDisconnectedIcon />
          </Tooltip>
        )}
        {isDeviceDisconnected && (
          <Tooltip
            label={t('routes.dashboard.sections.toggling.gateDisconnected.deviceDisconnected')}
          >
            <DeviceDisconnectedIcon />
          </Tooltip>
        )}
      </DisconnectedIcons>
    </DisconnectedContainer>
  );
};

export default GateDisconnected;
