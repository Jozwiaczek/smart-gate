import { routes } from '../constants';
import { Role } from '../enums/role.enum';
import { BasicConditionProps, ConditionFunc } from './ConditionRoute/Condition.types';

type onlyAuthenticatedConditionType = (requiredRoles?: [Role]) => ConditionFunc;

export const onlyAuthenticatedCondition: onlyAuthenticatedConditionType =
  (requiredRoles?: [Role]) =>
  ({ currentUser }) => {
    if (!currentUser) {
      return false;
    }
    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }

    return (
      currentUser &&
      currentUser.roles &&
      requiredRoles.some((role) => currentUser.roles.includes(role))
    );
  };

const onlyUnauthenticatedCondition: ConditionFunc = ({ currentUser }) => !currentUser;

const allowAllCondition: ConditionFunc = () => true;

const { LOGIN } = routes.unauthorized;
const { HOME } = routes.authorized.appBar;

export const onlyAuthenticated: BasicConditionProps = {
  condition: onlyAuthenticatedCondition(),
  redirectTo: LOGIN,
};

export const onlyUnauthenticated: BasicConditionProps = {
  condition: onlyUnauthenticatedCondition,
  redirectTo: HOME,
};

export const allowAll: BasicConditionProps = {
  condition: allowAllCondition,
  redirectTo: HOME,
};
