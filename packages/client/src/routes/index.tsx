import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from '../constants';
import { Dashboard, Login, Registration } from '../containers';
import { GlobalLayout } from '../elements';
import RouteGuard from './RouteGuard';

const Routes = () => (
  <BrowserRouter>
    <GlobalLayout>
      <Switch>
        <RouteGuard exact path={routes.home} component={Dashboard} />
        <Route path={routes.registration} component={Registration} />
        <Route path={routes.login} component={Login} />
      </Switch>
    </GlobalLayout>
  </BrowserRouter>
);

export default Routes;
