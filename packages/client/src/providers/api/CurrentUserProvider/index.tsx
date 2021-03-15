import React, { useMemo, useState } from 'react';

import LocalStorageKey from '../../../constants/localStorageKeys';
import { useLocalStorageMemory } from '../../../hooks';
import { CurrentUserContext } from './CurrentUserProvider.context';
import { CurrentUserProviderProps, User } from './CurrentUserProvider.types';

const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [storeUser, setStoreUser] = useState<User | undefined>();
  const [getExpiration, setExpiration] = useLocalStorageMemory<number>(
    LocalStorageKey.LOGIN_EXPIRATION_DATE,
  );

  const user = useMemo(() => {
    const expiration = getExpiration();
    if (expiration && new Date(expiration).getTime() > Date.now()) {
      return storeUser;
    }
    return undefined;
  }, [getExpiration, storeUser]);

  const setUser = (newUser: User | undefined, expirationDate: number | undefined = undefined) => {
    setExpiration(expirationDate);
    setStoreUser(() => newUser);
  };

  return (
    <CurrentUserContext.Provider value={[user, setUser]}>{children}</CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
