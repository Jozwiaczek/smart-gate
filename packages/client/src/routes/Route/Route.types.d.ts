import { ReactNode } from 'react';
import { RouteProps as RRRouteProps } from 'react-router';

export interface RouteProps extends RRRouteProps {
  children: ReactNode;
}
