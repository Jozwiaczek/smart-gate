import * as Sentry from '@sentry/react';
import React, { useCallback, useMemo, useState } from 'react';

import { useLocalStorageMemory } from '../../../hooks';
import { ApiUser } from '../../../interfaces/api.types';
import { CurrentUserContext } from './CurrentUserProvider.context';
import { CurrentUserContextValue, CurrentUserProviderProps } from './CurrentUserProvider.types';

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

  const setUser = useCallback(
    (newUser: ApiUser | undefined, expirationDate: number | undefined = undefined) => {
      if ((!newUser && !expirationDate) || expirationDate) {
        setExpiration(expirationDate);
      }
      setStoreUser(() => newUser);

      if (newUser) {
        const { id, email, externalIntegrationsToken, firstName, lastName, roles } = newUser;
        Sentry.setUser({
          id,
          email,
          username: `${firstName} ${lastName}`,
          externalIntegrationsToken,
        });
        Sentry.setTag('roles', String(roles));
      } else {
        Sentry.setUser(null);
        Sentry.setTag('roles', undefined);
      }
    },
    [setExpiration],
  );

  const contextValue: CurrentUserContextValue = useMemo(() => [user, setUser], [user, setUser]);

  return <CurrentUserContext.Provider value={contextValue}>{children}</CurrentUserContext.Provider>;
};

export default CurrentUserProvider;
