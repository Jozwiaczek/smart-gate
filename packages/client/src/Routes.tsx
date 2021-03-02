import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from './constants';
import { Dashboard, Login, Registration } from './containers';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.home} component={Login} />
      <Route path={routes.registration} component={Registration} />
      <Route path={routes.dashboard} component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
