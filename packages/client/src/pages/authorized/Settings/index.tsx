import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../../../elements';
import { useAuth, useThemeType } from '../../../hooks';
import { SGLocale } from '../../../i18n';
import { ThemeType } from '../../../theme/Theme';
import { Title } from '../AuthorizedPages.styled';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { logout, logoutFromAllDevices } = useAuth();
  const { themeType, setThemeType } = useThemeType();

  const logoutUser = async () => {
    await logout();
  };

  const logoutUserFromAllDevices = async () => {
    await logoutFromAllDevices();
  };

  const changeLocale = () => {
    void i18n.changeLanguage(i18n.language === SGLocale.pl ? SGLocale.en : SGLocale.pl);
  };

  const onChangeTheme = () => {
    if (themeType === ThemeType.light) {
      setThemeType(ThemeType.dark);
    } else {
      setThemeType(ThemeType.light);
    }
  };

  return (
    <>
      <Title>{t('routes.settings.title')}</Title>
      <h2>{t('routes.general.sectionInConstruction')}</h2>
      <Button data-testid="button-logout" onClick={logoutUser} margin="20px 0">
        {t('routes.settings.logout')}
      </Button>
      <Button onClick={logoutUserFromAllDevices} margin="20px 0">
        {t('routes.settings.logoutFromAllDevices')}
      </Button>
      <Button data-testid="btn-switch-theme" onClick={onChangeTheme} margin="20px 0">
        Change to {themeType === ThemeType.light ? 'dark' : 'light'} theme
      </Button>
      <Button onClick={changeLocale} color="secondary">
        Change locale to {i18n.language === SGLocale.pl ? SGLocale.en : SGLocale.pl}
      </Button>
    </>
  );
};

export default Settings;
