import { RouteProps } from 'react-router';

export interface RouteGuardProps extends RouteProps {
  redirectTo?: string;
}
