import { ReactNode } from 'react';

import { RouteAnimationsType } from '../../../routes/routeAnimations/routeAnimations.type';

export interface BackLinkProps {
  to: string;
  withTransition?: RouteAnimationsType;
}

export interface CardLayoutProps {
  back?: BackLinkProps;
  children: ReactNode;
}

export interface ActionsContainerProps {
  direction?: 'column' | 'row';
  children: ReactNode;
}
