import { RouteProps } from 'react-router';

import { Role } from '../../enums/role.enum';
import { ApiUser } from '../../interfaces/api.types';

export interface ConditionFuncProps {
  currentUser: ApiUser | undefined;
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
