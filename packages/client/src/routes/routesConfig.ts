import { RouteProps as RouterRouteProps } from 'react-router';

import { routes } from '../constants';
import { Dashboard, Login, Registration } from '../containers';

interface RouteProps extends RouterRouteProps {
  path: string;
}

export const authorizedRoutes = [
  {
    path: routes.HOME,
    component: Dashboard,
    exact: true,
  },
];

export const unauthorizedRoutes: Array<RouteProps> = [
  {
    path: routes.LOGIN,
    component: Login,
  },
  {
    path: routes.REGISTRATION,
    component: Registration,
  },
];
