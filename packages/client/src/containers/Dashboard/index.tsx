import React from 'react';
import { Button } from '../../elements';
import { useAuth } from '../../hooks';
import { Container } from './Dashboard.styled';

const Dashboard = () => {
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

  return (
    <Container>
      <h1>Smart Gate</h1>
      <h2>Dashboard</h2>
      <Button to="/" onClick={logoutUser}>
        Logout
      </Button>
      <Button onClick={getMe} color="secondary">
        Test
      </Button>
    </Container>
  );
};

export default Dashboard;
