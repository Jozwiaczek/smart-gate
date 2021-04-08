import * as Sentry from '@sentry/react';
import React, { useMemo, useState } from 'react';

import { useLocalStorageMemory } from '../../../hooks';
import { ApiUser } from '../../../interfaces/api.types';
import { CurrentUserContext } from './CurrentUserProvider.context';
import { CurrentUserProviderProps } from './CurrentUserProvider.types';

const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [storeUser, setStoreUser] = useState<ApiUser | undefined>();
  const [getExpiration, setExpiration] = useLocalStorageMemory<number>('loginExpirationDate');

  const user = useMemo(() => {
    const expiration = getExpiration();
    if (expiration && new Date(expiration).getTime() > Date.now()) {
      return storeUser;
    }
    return undefined;
  }, [getExpiration, storeUser]);

  const setUser = (
    newUser: ApiUser | undefined,
    expirationDate: number | undefined = undefined,
  ) => {
    setExpiration(expirationDate);
    setStoreUser(() => newUser);

    if (newUser) {
      Sentry.setUser({
        id: newUser.id,
        email: newUser.email,
        username: `${newUser.firstName} ${newUser.lastName}`,
      });
      Sentry.setTag('roles', String(newUser.roles));
    } else {
      Sentry.setUser(null);
      Sentry.setTag('roles', undefined);
    }
  };

  return (
    <CurrentUserContext.Provider value={[user, setUser]}>{children}</CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
