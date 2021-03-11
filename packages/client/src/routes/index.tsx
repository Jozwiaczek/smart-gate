import React from 'react';
import { RouteProps as RouterRouteProps } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from '../constants';
import { Dashboard, Login, Registration } from '../containers';
import { GlobalLayout } from '../elements';
import { useCurrentUser } from '../hooks';
import { AuthProvider } from '../providers/api';
import PublicRoute from './PublicRoute';
import RouteGuard from './RouteGuard';

interface RouteProps extends RouterRouteProps {
  path: string;
}

export const unauthorizedRoutes: Array<RouteProps> = [
  {
    path: routes.login,
    component: Login,
  },
  {
    path: routes.registration,
    component: Registration,
  },
];

export const authorizedRoutes = [
  {
    path: routes.home,
    component: Dashboard,
    exact: true,
  },
];

const NotFoundPage = () => {
  const [currentUser] = useCurrentUser();
  console.log('L:37 | currentUser: ', currentUser);
  return <p>NotFoundPage</p>;
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
            <RouteGuard key={routeProps.path} {...routeProps} />
          ))}
          <Route component={NotFoundPage} />
        </Switch>
      </AuthProvider>
    </GlobalLayout>
  </BrowserRouter>
);

export default Routes;
