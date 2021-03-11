import React from 'react';
import { RouteProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import { routes } from '../../constants';
import { useCurrentUser } from '../../hooks';

const RouteGuard = (props: RouteProps) => {
  const [currentUser] = useCurrentUser();

  if (currentUser) {
    return <Route {...props} />;
  }

  return <Redirect to={{ pathname: routes.login }} />;
};

export default RouteGuard;
