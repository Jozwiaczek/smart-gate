import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from '../constants';
import { Dashboard, SignIn, SignUp } from '../containers';
import RouteGuard from './RouteGuard';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <RouteGuard exact path={routes.home} component={Dashboard} />
      <Route path={routes.login} component={SignIn} />
      <Route path={routes.registration} component={SignUp} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
