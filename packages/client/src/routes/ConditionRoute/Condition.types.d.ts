import { RouteProps } from 'react-router';

import { Role } from '../../enums/role.enum';
import { User } from '../../providers/api/CurrentUserProvider/CurrentUserProvider.types';

export interface ConditionFuncProps {
  currentUser: User | undefined;
}

export type ConditionFunc = (props: ConditionFuncProps) => boolean;

export interface BasicConditionProps {
  condition: ConditionFunc;
  redirectTo: string;
}

export interface ConditionRouteProps extends BasicConditionProps, RouteProps {}

interface OnlyAuthenticatedRouteProps extends RouteProps {
  roles?: [Role];
}
