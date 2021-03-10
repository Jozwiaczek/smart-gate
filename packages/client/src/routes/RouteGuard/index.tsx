import React from 'react';

import Route from '../Route';
import Guard from './Guard';
import { RouteGuardProps } from './RouteGuard.types';

const RouteGuard = ({ children, ...props }: RouteGuardProps) => (
  <Route {...props}>
    <Guard {...props}>{children}</Guard>
  </Route>
);

export default RouteGuard;
