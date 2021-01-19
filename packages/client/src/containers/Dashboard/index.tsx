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

  const { logout, getCurrentUser } = auth;

  const getMe = async () => {
    const user = await getCurrentUser();
    console.log('L:18 | user: ', user);
  };

  return (
    <Container>
      <Typography variant="h1">Smart Gate</Typography>
      <h2>Dashboard</h2>
      <Button variant="contained" component={Link} to="/" onClick={logout} color="primary">
        Logout
      </Button>
      <Button variant="contained" onClick={getMe} color="secondary">
        Test
      </Button>
    </Container>
  );
};

export default Dashboard;
