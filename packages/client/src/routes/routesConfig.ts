import { routes } from '../constants';
import { AppBar } from '../elements';
import { Login, PageNotFound, PasswordRecovery, Registration, UpdatePassword } from '../pages';
import {
  BasicRouteProps,
  ConditionRouteProps,
  OnlyAuthenticatedRouteProps,
} from './ConditionRoute/Condition.types';
import {
  allowAll,
  onlyAuthenticated,
  onlyAuthenticatedCondition,
  onlyUnauthenticated,
} from './conditions';

const onlyAuthenticatedRoutes: Array<ConditionRouteProps> = (<Array<OnlyAuthenticatedRouteProps>>[
  {
    path: routes.HOME,
    component: AppBar,
  },
]).map(({ roles, ...props }) => ({
  ...props,
  ...onlyAuthenticated,
  condition: onlyAuthenticatedCondition(roles),
}));

const onlyUnauthenticatedRoutes: Array<ConditionRouteProps> = (<Array<BasicRouteProps>>[
  {
    path: routes.LOGIN,
    component: Login,
    exact: true,
  },
  {
    path: routes.REGISTRATION,
    component: Registration,
    exact: true,
  },
  {
    path: routes.PASSWORD_RECOVERY,
    exact: true,
    component: PasswordRecovery,
  },
  {
    path: routes.PASSWORD_RECOVERY_UPDATE,
    component: UpdatePassword,
  },
]).map((props) => ({ ...props, ...onlyUnauthenticated }));

const allowAllRoutes: Array<ConditionRouteProps> = (<Array<BasicRouteProps>>[
  {
    path: routes.PAGE_NOT_FOUND,
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
