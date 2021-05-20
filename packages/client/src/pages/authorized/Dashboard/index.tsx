import React from 'react';
import { useTranslation } from 'react-i18next';

import { useSnackbar } from '../../../hooks';
import { Title } from '../AuthorizedPages.styled';
import { ToggleButton } from './Dashboard.styled';

const Dashboard = () => {
  const { t } = useTranslation();
  const showSnackbar = useSnackbar();

  const onToggle = () => {
    console.count('toggledGate');
    showSnackbar({ message: t('routes.dashboard.toggleSuccess'), severity: 'success' });
  };

  return (
    <>
      <Title>{t('routes.dashboard.title')}</Title>
      <ToggleButton margin="40px" onClick={onToggle}>
        {t('routes.dashboard.toggleGate')}
      </ToggleButton>
    </>
  );
};

export default Dashboard;
