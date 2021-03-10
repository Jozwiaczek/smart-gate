import 'react-tiger-transition/styles/main.min.css';
import './routeAnimations';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from 'react-tiger-transition';

import { routes } from '../constants';
import { Dashboard, Login, Registration } from '../containers';
import { GlobalLayout } from '../elements';
import Route from './Route';
import RouteGuard from './RouteGuard';

const Routes = () => {
  return (
    <BrowserRouter>
      <GlobalLayout>
        <Navigation>
          <Route exact path={routes.registration}>
            <Registration />
          </Route>
          <Route exact path={routes.login}>
            <Login />
          </Route>
          <RouteGuard exact path={routes.home}>
            <Dashboard />
          </RouteGuard>
        </Navigation>
      </GlobalLayout>
    </BrowserRouter>
  );
};

export default Routes;
