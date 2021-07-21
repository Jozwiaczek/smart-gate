import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../../../elements';
import { useAuth } from '../../../hooks';
import { SGLocale } from '../../../i18n';
import { Title } from '../AuthorizedPages.styled';
import ThemeCard from './cards/ThemeCard';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { logout, logoutFromAllDevices } = useAuth();

  const logoutUser = async () => {
    await logout();
  };

  const logoutUserFromAllDevices = async () => {
    await logoutFromAllDevices();
  };

  const changeLocale = () => {
    void i18n.changeLanguage(i18n.language === SGLocale.pl ? SGLocale.en : SGLocale.pl);
  };

  return (
    <>
      <Title>{t('routes.settings.title')}</Title>
      <ThemeCard />
      <Button data-testid="button-logout" onClick={logoutUser} margin="20px 0">
        {t('routes.settings.logout')}
      </Button>
      <Button onClick={logoutUserFromAllDevices} margin="20px 0">
        {t('routes.settings.logoutFromAllDevices')}
      </Button>
      <Button onClick={changeLocale} color="secondary">
        Change locale to {i18n.language === SGLocale.pl ? SGLocale.en : SGLocale.pl}
      </Button>
    </>
  );
};

export default Settings;
