import { RouteProps } from 'react-router';

import { routes } from '../constants';
import AppBar from '../elements/AppBar';
import { Login, PageNotFound, PasswordRecovery, Registration, UpdatePassword } from '../pages';
import mapRoutesToArray from '../utils/mapRoutesToArray';
import { ConditionRouteProps, OnlyAuthenticatedRouteProps } from './ConditionRoute/Condition.types';
import {
  allowAll,
  onlyAuthenticated,
  onlyAuthenticatedCondition,
  onlyUnauthenticated,
} from './conditions';

const { LOGIN, REGISTRATION, PAGE_NOT_FOUND, PASSWORD_RECOVERY, PASSWORD_RECOVERY_UPDATE } =
  routes.unauthorized;

const onlyAuthenticatedRoutes: Array<ConditionRouteProps> = (<Array<OnlyAuthenticatedRouteProps>>[
  {
    path: mapRoutesToArray(routes.authorized),
    component: AppBar,
    exact: true,
  },
]).map(({ roles, ...props }) => ({
  ...props,
  ...onlyAuthenticated,
  condition: onlyAuthenticatedCondition(roles),
}));

const onlyUnauthenticatedRoutes: Array<ConditionRouteProps> = (<Array<RouteProps>>[
  {
    path: LOGIN,
    component: Login,
    exact: true,
  },
  {
    path: REGISTRATION,
    component: Registration,
    exact: true,
  },
  {
    path: PASSWORD_RECOVERY,
    exact: true,
    component: PasswordRecovery,
  },
  {
    path: PASSWORD_RECOVERY_UPDATE,
    component: UpdatePassword,
  },
]).map((props) => ({ ...props, ...onlyUnauthenticated }));

const allowAllRoutes: Array<ConditionRouteProps> = (<Array<RouteProps>>[
  {
    path: PAGE_NOT_FOUND,
    component: PageNotFound,
  },
]).map((props) => ({
  ...props,
  ...allowAll,
}));

export const routesArray: Array<ConditionRouteProps> = [
  ...allowAllRoutes,
  ...onlyUnauthenticatedRoutes,
  ...onlyAuthenticatedRoutes,
];
