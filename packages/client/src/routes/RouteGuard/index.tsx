import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { routes } from '../../constants';
import { PageLoader } from '../../elements';
import { useAuth } from '../../hooks';
import { LazyLoading } from '../../interfaces/lazyLoading';
import { RouteGuardProps } from './RouteGuard.types';

const RouteGuard = ({ redirectTo = routes.login, ...rest }: RouteGuardProps) => {
  const { isAuthenticated } = useAuth();
  const [{ data, loading }, setLazyLoading] = useState<LazyLoading<boolean>>({
    error: false,
    loading: true,
    data: false,
  });

  useEffect(() => {
    let isActive = true;
    isAuthenticated()
      .then((isUserLoaded) => {
        if (isActive) {
          setLazyLoading((prev) => ({ ...prev, data: isUserLoaded, loading: false }));
        }
      })
      .catch(() => {
        if (isActive) {
          setLazyLoading((prev) => ({ ...prev, loading: false, error: true }));
        }
      });
    return () => {
      isActive = false;
    };
  }, [isAuthenticated]);

  if (true) {
    return <PageLoader />;
  }

  if (data) {
    return <Route {...rest} />;
  }

  return <Redirect to={{ pathname: redirectTo }} />;
};

export default RouteGuard;
