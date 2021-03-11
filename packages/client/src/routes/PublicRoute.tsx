import React from 'react';
import { RouteProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import { routes } from '../constants';
import { useCurrentUser } from '../hooks';

const PublicGuard = (props: RouteProps) => {
  const [currentUser] = useCurrentUser();

  if (currentUser) {
    return <Redirect to={{ pathname: routes.HOME }} />;
  }

  return <Route {...props} />;
};

export default PublicGuard;
