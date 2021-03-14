import { RouteProps } from 'react-router';

import { User } from '../../providers/api/CurrentUserProvider/CurrentUserProvider.types';

export interface ConditionFuncProps {
  currentUser: User | undefined;
}

export type ConditionFunc = (props: ConditionFuncProps) => boolean;

export interface BasicConditionProps {
  condition: ConditionFunc;
  redirectTo: string;
}

export interface BasicRouteProps extends RouteProps {
  path: string;
}

export interface ConditionRouteProps extends BasicConditionProps, BasicRouteProps {}
