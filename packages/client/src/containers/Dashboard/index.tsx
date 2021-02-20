import React from 'react';

import { Button } from '../../elements';
import { useAuth, useThemeType } from '../../hooks';
import { ThemeType } from '../../theme/Theme';
import { Container } from './Dashboard.styled';

const Dashboard = () => {
  const auth = useAuth();
  const { themeType, setThemeType } = useThemeType();

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

  const onTest = () => {
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
        Logout
      </Button>
      <Button onClick={getMe} colorVariant={ThemeType.light} margin="20px">
        Test
      </Button>
      <Button onClick={onTest} margin="20px">
        Change to {themeType === ThemeType.light ? 'dark' : 'light'} theme
      </Button>
    </Container>
  );
};

export default Dashboard;
