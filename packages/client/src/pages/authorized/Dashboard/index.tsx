import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useSnackbar } from '../../../hooks';
import { WebSocketContext } from '../../../providers/api/WebSocketProvider/WebSocketProvider.context';
import { Title } from '../AuthorizedPages.styled';
import { ToggleButton } from './Dashboard.styled';

const Dashboard = () => {
  const { t } = useTranslation();
  const showSnackbar = useSnackbar();
  const { connect, disconnect, connectionState, deviceStatus } = useContext(WebSocketContext);

  useEffect(() => {
    void connect();
  }, [connect]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  const onToggle = () => {
    console.count('toggledGate');
    showSnackbar({ message: t('routes.dashboard.toggleSuccess'), severity: 'success' });
  };

  return (
    <>
      <p>WebSocket: {connectionState}</p>
      <p>DeviceStatus: {deviceStatus}</p>
      <Title data-testid="dashboard-title">{t('routes.dashboard.title')}</Title>
      <ToggleButton margin="40px" onClick={onToggle}>
        {t('routes.dashboard.toggleGate')}
      </ToggleButton>
    </>
  );
};

export default Dashboard;
