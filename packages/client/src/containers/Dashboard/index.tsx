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

  const { logout } = auth;

  return (
    <Container>
      <Typography variant="h1">Smart Gate</Typography>
      <h2>Dashboard</h2>
      <Button variant="contained" component={Link} to="/" onClick={logout} color="primary">
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
