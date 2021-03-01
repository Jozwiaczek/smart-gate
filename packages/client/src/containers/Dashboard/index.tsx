import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../../elements';
import { useAuth } from '../../hooks';
import { SGLocale } from '../../i18n';
import { Container } from './Dashboard.styled';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const auth = useAuth();
  if (!auth) {
    return null;
  }

  const { logout, getCurrentUser } = auth;

  const getMe = async () => {
    const user = await getCurrentUser();
    console.log('L:18 | user: ', user);
  };

  const logoutUser = async () => {
    await logout();
  };

  const changeLocale = () => {
    i18n.changeLanguage(i18n.language === SGLocale.pl ? SGLocale.en : SGLocale.pl);
  };

  return (
    <Container>
      <h1>{t('title')}</h1>
      <h2>Dashboard</h2>
      <Button to="/" onClick={logoutUser}>
        {t('actions.logout')}
      </Button>
      <Button onClick={getMe} color="secondary">
        Test Get Me
      </Button>
      <Button onClick={changeLocale} color="secondary">
        Change locale to {i18n.language === SGLocale.pl ? SGLocale.en : SGLocale.pl}
      </Button>
    </Container>
  );
};

export default Dashboard;
