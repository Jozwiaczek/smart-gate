import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { routes } from '../../constants';
import { useAuth } from '../../hooks';
import { LazyLoading } from '../../interfaces/lazyLoading';
import { RouteGuardProps } from './routeGuard.types,d';

const Loading = () => {
  return <p>loading</p>;
};

const RouteGuard = ({ redirectTo = routes.login, ...rest }: RouteGuardProps) => {
  const [{ data, loading }, setLazyLoading] = useState<LazyLoading<boolean>>({
    error: false,
    loading: true,
    data: false,
  });

  const auth = useAuth();

  useEffect(() => {
    let isActive = true;
    auth
      ?.isAuthenticated()
      .then((isAuth) => {
        if (isActive) {
          setLazyLoading((prev) => ({ ...prev, data: isAuth, loading: false }));
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
  }, [auth]);

  if (loading) {
    return <Loading />;
  }

  return <>{data ? <Route {...rest} /> : <Redirect to={{ pathname: redirectTo }} />}</>;
};

export default RouteGuard;
