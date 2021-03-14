import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { GlobalLayout } from '../elements';
import { useCurrentUser } from '../hooks';
import ConditionRoute from './ConditionRoute';
import { routesArray } from './routesConfig';

const NotFoundPage = () => {
  const [currentUser] = useCurrentUser();
  return <p>NotFoundPage - {currentUser?.email}</p>;
};

const Routes = () => (
  <BrowserRouter>
    <GlobalLayout>
      <Switch>
        {routesArray.map((props) => (
          <ConditionRoute key={props.path} {...props} />
        ))}
        <Route component={NotFoundPage} />
      </Switch>
    </GlobalLayout>
  </BrowserRouter>
);

export default Routes;
