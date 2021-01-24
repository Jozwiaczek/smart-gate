import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { Container } from './Dashboard.styled';

const Dashboard = () => {
  const auth = useAuth();
  if (!auth) {
    return null;
  }

  const { logout, getCurrentUser, refresh } = auth;

  const getMe = async () => {
    const user = await getCurrentUser();
    console.log('L:18 | user: ', user);
  };

  const logoutUser = async () => {
    const data = await logout();
    console.log(data);
  };

  const refreshToken = async () => {
    await refresh();
  };

  return (
    <Container>
      <Typography variant="h1">Smart Gate</Typography>
      <h2>Dashboard</h2>
      <Button variant="contained" component={Link} to="/" onClick={logoutUser} color="primary">
        Logout
      </Button>
      <Button variant="contained" onClick={getMe} color="secondary">
        Test
      </Button>
      <Button variant="contained" onClick={refreshToken} color="inherit">
        Refresh
      </Button>
    </Container>
  );
};

export default Dashboard;
