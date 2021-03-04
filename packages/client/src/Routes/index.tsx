import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from '../constants';
import { Dashboard, DefaultLayout, Login, Registration } from '../containers';
import RouteGuard from './RouteGuard';

const Routes = () => (
  <BrowserRouter>
    <DefaultLayout>
      <Switch>
        <RouteGuard exact path={routes.home} component={Dashboard} />
        <Route path={routes.registration} component={Registration} />
        <Route path={routes.login} component={Login} />
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
);

export default Routes;
