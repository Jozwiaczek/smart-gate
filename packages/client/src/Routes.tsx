import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from './constants';
import { Dashboard, SignIn, SignUp } from './containers';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.home} component={SignIn} />
      <Route path={routes.registration} component={SignUp} />
      <Route path={routes.dashboard} component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
