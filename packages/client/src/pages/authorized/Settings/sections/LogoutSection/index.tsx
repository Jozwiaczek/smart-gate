import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/elements';

import { useAuth } from '../../../../../hooks';
import SettingsSection from '../SettingsSection';

const LogoutSection = () => {
  const { t } = useTranslation();
  const { logout, logoutFromAllDevices } = useAuth();

  const logoutUser = async () => {
    await logout();
  };

  const logoutUserFromAllDevices = async () => {
    await logoutFromAllDevices();
  };

  return (
    <SettingsSection title="routes.settings.logout.title">
      <Button data-testid="button-logout" onClick={logoutUser} margin="20px 0">
        {t('routes.settings.logout.logout')}
      </Button>
      <Button onClick={logoutUserFromAllDevices} margin="20px 0">
        {t('routes.settings.logout.logoutFromAllDevices')}
      </Button>
    </SettingsSection>
  );
};

export default LogoutSection;
