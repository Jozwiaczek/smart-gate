import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleSlider } from '../../../elements';
import { useAxios } from '../../../hooks';
import { WebSocketContext } from '../../../providers/api/WebSocketProvider/WebSocketProvider.context';
import registerWebPush from '../../../utils/registerWebPush';
import { Title } from '../AuthorizedPages.styled';
import { ToggleSliderWrapper } from './Dashboard.styled';

const Dashboard = () => {
  const { t } = useTranslation();
  const axios = useAxios();
  const { connect, disconnect, toggleGate, connectionState, deviceStatus } =
    useContext(WebSocketContext);

  useEffect(() => {
    void connect();
  }, [connect]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  useEffect(() => {
    void registerWebPush(axios);
  }, [axios]);

  const onToggle = () => {
    toggleGate();
  };

  return (
    <>
      <Title data-testid="dashboard-title">{t('routes.dashboard.title')}</Title>
      <ToggleSliderWrapper>
        <ToggleSlider onToggle={onToggle} />
      </ToggleSliderWrapper>
      <p>WebSocket: {connectionState}</p>
      <p>DeviceStatus: {deviceStatus}</p>
    </>
  );
};

export default Dashboard;
