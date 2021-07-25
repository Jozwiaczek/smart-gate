import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/elements';

import { useAuth } from '../../../../../hooks';
import { LogoutAllIcon, LogoutIcon } from '../../../../../icons';
import SettingsSection from '../SettingsSection';
import { ButtonsContainer, StyledButton } from './LogoutSection.styled';

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
      <ButtonsContainer>
        <StyledButton
          colorVariant="card"
          fullWidth
          data-testid="button-logout"
          onClick={logoutUser}
        >
          <LogoutIcon />
          {t('routes.settings.logout.logout')}
        </StyledButton>
        <StyledButton colorVariant="card" fullWidth onClick={logoutUserFromAllDevices}>
          <LogoutAllIcon />
          {t('routes.settings.logout.logoutFromAllDevices')}
        </StyledButton>
      </ButtonsContainer>
    </SettingsSection>
  );
};

export default LogoutSection;
