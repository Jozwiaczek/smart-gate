import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';

import { routes } from '../constants';
import { GlobalLayout } from '../elements';
import ConditionRoute from './ConditionRoute';
import { routesArray } from './routesConfig';

const Routes = () => (
  <BrowserRouter>
    <GlobalLayout>
      <Switch>
        {routesArray.map((props) => (
          <ConditionRoute key={String(props.path)} {...props} />
        ))}
        <Redirect path="*" to={routes.unauthorized.PAGE_NOT_FOUND} />
      </Switch>
    </GlobalLayout>
  </BrowserRouter>
);

export default Routes;
