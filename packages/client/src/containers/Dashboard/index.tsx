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
    await getCurrentUser();
  };

  const logoutUser = async () => {
    await logout();
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
        Logout
      </Button>
      <Button onClick={getMe} margin="20px">
        Test
      </Button>
      <Button onClick={onChangeTheme} margin="20px">
        Change to {themeType === ThemeType.light ? 'dark' : 'light'} theme
      </Button>
    </Container>
  );
};

export default Dashboard;
