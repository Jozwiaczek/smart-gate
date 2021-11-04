import React, { useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CircleLoader } from '../../../elements';
import { ConnectionState } from '../../../enums/connectionState.enum';
import { DeviceStatus } from '../../../enums/deviceStatus.enum';
import { useAxios } from '../../../hooks';
import { WebSocketContext } from '../../../providers/api/WebSocketProvider/WebSocketProvider.context';
import { isCameraPreviewEnabled, registerWebPush } from '../../../utils';
import { Title } from '../AuthorizedPages.styled';
import { RowSection } from './Dashboard.styled';
import CameraPreviewSection from './sections/CameraPreviewSection';
import TogglingSection from './sections/TogglingSection';
import GateDisconnected from './sections/TogglingSection/components/GateDisconnected';

const Dashboard = () => {
  const { t } = useTranslation();
  const axios = useAxios();
  const { connectionState, deviceStatus } = useContext(WebSocketContext);

  const isConnected = useMemo(
    () => connectionState === ConnectionState.CONNECTED && deviceStatus === DeviceStatus.CONNECTED,
    [connectionState, deviceStatus],
  );
  const isLoading = connectionState === ConnectionState.CONNECTING;

  useEffect(() => {
    void registerWebPush(axios);
  }, [axios]);

  const DeviceSections = () => {
    if (!isConnected) {
      return <GateDisconnected connectionState={connectionState} deviceStatus={deviceStatus} />;
    }

    return (
      <>
        <TogglingSection />
        <CameraPreviewSection />
      </>
    );
  };

  return (
    <>
      <Title data-testid="dashboard-title">{t('routes.dashboard.title')}</Title>
      <RowSection isCameraMode={isCameraPreviewEnabled()}>
        {isLoading ? (
          <CircleLoader variant="large" label="routes.dashboard.connecting" />
        ) : (
          <DeviceSections />
        )}
      </RowSection>
    </>
  );
};

export default Dashboard;
