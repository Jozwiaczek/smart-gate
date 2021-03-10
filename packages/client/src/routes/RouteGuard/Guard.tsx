import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { routes } from '../../constants';
import { PageLoader } from '../../elements';
import { useAuth } from '../../hooks';
import { LazyLoading } from '../../interfaces/lazyLoading';
import Route from '../Route';
import { RouteGuardProps } from './RouteGuard.types';

const Guard = ({ redirectTo = routes.login, children, ...rest }: RouteGuardProps) => {
  const { isAuthenticated } = useAuth();
  const [{ data, state }, setLazyLoading] = useState<LazyLoading<boolean>>({
    data: false,
    state: 'loading',
  });

  useEffect(() => {
    let isActive = true;
    isAuthenticated()
      .then((isUserLoaded) => {
        if (isActive) {
          setLazyLoading(() => ({ data: isUserLoaded, state: 'data' }));
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
  }, [isAuthenticated]);

  switch (true) {
    case state === 'loading':
      return <PageLoader />;
    case state === 'data' && data:
      return <Route {...rest}>{children}</Route>;
    default:
      return <Redirect to={{ pathname: redirectTo }} />;
  }
};

export default Guard;
