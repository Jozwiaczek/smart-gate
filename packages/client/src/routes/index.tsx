import 'react-tiger-transition/styles/main.min.css';
import './routeAnimations';

import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { Navigation } from 'react-tiger-transition';

import { routes } from '../constants';
import { Dashboard, Login, PageNotFound, Registration } from '../containers';
import { GlobalLayout } from '../elements';
import Route from './Route';
import RouteGuard from './RouteGuard';

const Routes = () => {
  return (
    <BrowserRouter>
      <GlobalLayout>
        <Navigation defaultRoute={<Redirect to={routes.pageNotFound} />}>
          <Route exact path={routes.registration}>
            <Registration />
          </Route>
          <Route exact path={routes.login}>
            <Login />
          </Route>
          <RouteGuard exact path={routes.home}>
            <Dashboard />
          </RouteGuard>
          <Route exact path={routes.pageNotFound}>
            <PageNotFound />
          </Route>
        </Navigation>
      </GlobalLayout>
    </BrowserRouter>
  );
};

export default Routes;
