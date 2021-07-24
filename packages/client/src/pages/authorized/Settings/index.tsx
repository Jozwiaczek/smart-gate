import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../../../elements';
import { useAuth } from '../../../hooks';
import { Title } from '../AuthorizedPages.styled';
import LanguageCard from './cards/LanguageCard';
import ThemeCard from './cards/ThemeCard';

const Settings = () => {
  const { t } = useTranslation();
  const { logout, logoutFromAllDevices } = useAuth();

  const logoutUser = async () => {
    await logout();
  };

  const logoutUserFromAllDevices = async () => {
    await logoutFromAllDevices();
  };

  return (
    <>
      <Title>{t('routes.settings.title')}</Title>
      <ThemeCard />
      <LanguageCard />
      <Button data-testid="button-logout" onClick={logoutUser} margin="20px 0">
        {t('routes.settings.logout')}
      </Button>
      <Button onClick={logoutUserFromAllDevices} margin="20px 0">
        {t('routes.settings.logoutFromAllDevices')}
      </Button>
    </>
  );
};

export default Settings;
