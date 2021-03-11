import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../../elements';
import { useAuth, useThemeType } from '../../hooks';
import { SGLocale } from '../../i18n';
import { ThemeType } from '../../theme/Theme';
import { Container } from './Dashboard.styled';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const { logout, checkAuth } = useAuth();
  const { themeType, setThemeType } = useThemeType();

  const getMe = async () => {
    console.log(await checkAuth());
  };

  const logoutUser = async () => {
    await logout();
  };

  const changeLocale = () => {
    i18n.changeLanguage(i18n.language === SGLocale.pl ? SGLocale.en : SGLocale.pl);
  };

  const onChangeTheme = () => {
    if (themeType === ThemeType.light) {
      setThemeType(ThemeType.dark);
    } else {
      setThemeType(ThemeType.light);
    }
  };

  return (
    <Container>
      <h1>Smart Gate</h1>
      <h2>Dashboard</h2>
      <Button to="/" onClick={logoutUser} margin="20px">
        {t('routes.dashboard.logout')}
      </Button>
      <Button onClick={onChangeTheme} margin="20px">
        Change to {themeType === ThemeType.light ? 'dark' : 'light'} theme
      </Button>
      <Button onClick={getMe} color="secondary" margin="20px">
        Test Get Me
      </Button>
      <Button onClick={changeLocale} color="secondary">
        Change locale to {i18n.language === SGLocale.pl ? SGLocale.en : SGLocale.pl}
      </Button>
    </Container>
  );
};

export default Dashboard;
