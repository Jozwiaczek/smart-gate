import { RouteProps } from '../Route/Route.types';

export interface RouteGuardProps extends RouteProps {
  redirectTo?: string;
}
