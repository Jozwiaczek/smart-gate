import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { GlobalLayout } from '../elements';
import { useCurrentUser } from '../hooks';
import { AuthProvider } from '../providers/api';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { authorizedRoutes, unauthorizedRoutes } from './routesConfig';

const NotFoundPage = () => {
  const [currentUser] = useCurrentUser();
  return <p>NotFoundPage - {currentUser?.email}</p>;
};

const Routes = () => (
  <BrowserRouter>
    <GlobalLayout>
      <AuthProvider>
        <Switch>
          {unauthorizedRoutes.map((routeProps) => (
            <PublicRoute key={routeProps.path} {...routeProps} />
          ))}
          {authorizedRoutes.map((routeProps) => (
            <PrivateRoute key={routeProps.path} {...routeProps} />
          ))}
          <Route component={NotFoundPage} />
        </Switch>
      </AuthProvider>
    </GlobalLayout>
  </BrowserRouter>
);

export default Routes;
