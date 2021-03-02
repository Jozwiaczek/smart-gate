import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from './constants';
import { Dashboard, DefaultLayout, Login, Registration } from './containers';

const Routes = () => (
  <BrowserRouter>
    <DefaultLayout>
      <Switch>
        <Route exact path={routes.home} component={Login} />
        <Route path={routes.registration} component={Registration} />
        <Route path={routes.dashboard} component={Dashboard} />
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
);

export default Routes;
