import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { PageLoader } from '../../elements';
import { useAuth } from '../../hooks';
import { LazyLoading } from '../../interfaces/lazyLoading';
import { ConditionRouteProps } from './Condition.types';

const ConditionRoute = ({ redirectTo, condition, ...props }: ConditionRouteProps) => {
  const { checkAuth } = useAuth();
  const [{ data, state }, setLazyLoading] = useState<LazyLoading<boolean>>({
    data: false,
    state: 'loading',
  });

  useEffect(() => {
    let isActive = true;

    checkAuth()
      .then((currentUser) => {
        if (isActive) {
          const routeCondition = condition({ currentUser });
          setLazyLoading(() => ({ state: 'data', data: routeCondition }));
        }
      })
      .catch(() => {
        if (isActive) {
          setLazyLoading((prev) => ({ ...prev, state: 'error' }));
        }
      });

    return () => {
      isActive = false;
    };
  }, [checkAuth, condition]);

  switch (true) {
    case state === 'loading':
      return <PageLoader />;
    case state === 'data' && data:
      return <Route {...props} />;
    default:
      return <Redirect to={{ pathname: redirectTo }} />;
  }
};

export default ConditionRoute;
