import { routes } from '../constants';
import { Dashboard, Login, PageNotFound, Registration } from '../containers';
import { Role } from '../enums/role.enum';
import { BasicRouteProps, ConditionRouteProps } from './ConditionRoute/Condition.types';
import {
  allowAll,
  onlyAuthenticated,
  onlyAuthenticatedCondition,
  onlyUnauthenticated,
} from './conditions';

interface OnlyAuthenticatedRouteProps extends BasicRouteProps {
  roles?: [Role];
}
const onlyAuthenticatedRoutes: Array<ConditionRouteProps> = (<Array<OnlyAuthenticatedRouteProps>>[
  {
    path: routes.HOME,
    component: Dashboard,
    exact: true,
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
  },
  {
    path: routes.REGISTRATION,
    component: Registration,
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
  ...onlyAuthenticatedRoutes,
  ...onlyUnauthenticatedRoutes,
  ...allowAllRoutes,
];
