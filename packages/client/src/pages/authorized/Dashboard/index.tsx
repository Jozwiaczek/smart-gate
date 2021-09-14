import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAxios } from '../../../hooks';
import { registerWebPush } from '../../../utils';
import { Title } from '../AuthorizedPages.styled';
import { RowSection } from './Dashboard.styled';
import CameraPreviewSection from './sections/CameraPreviewSection';
import TogglingSection from './sections/TogglingSection';

const Dashboard = () => {
  const { t } = useTranslation();
  const axios = useAxios();

  useEffect(() => {
    void registerWebPush(axios);
  }, [axios]);

  return (
    <>
      <Title data-testid="dashboard-title">{t('routes.dashboard.title')}</Title>
      <RowSection>
        <TogglingSection />
        <CameraPreviewSection />
      </RowSection>
    </>
  );
};

export default Dashboard;
