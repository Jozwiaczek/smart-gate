import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from '../constants';
import {
  Dashboard,
  Login,
  PageNotFound,
  PasswordRecovery,
  Registration,
  UpdatePassword,
} from '../containers';
import { GlobalLayout } from '../elements';
import RouteGuard from './RouteGuard';

const Routes = () => (
  <BrowserRouter>
    <GlobalLayout>
      <Switch>
        <RouteGuard exact path={routes.home} component={Dashboard} />
        <Route path={routes.registration} component={Registration} />
        <Route path={routes.login} component={Login} />
        <Route path={routes.passwordRecovery} component={PasswordRecovery} />
        <Route path={routes.updatePassword} component={UpdatePassword} />
        <Route component={PageNotFound} />
      </Switch>
    </GlobalLayout>
  </BrowserRouter>
);

export default Routes;
