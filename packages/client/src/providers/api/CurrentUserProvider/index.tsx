import React, { useMemo, useState } from 'react';

import useLocalStorage from '../../../hooks/useLocalStorage';
import { CurrentUserContext } from './CurrentUserProvider.context';
import { CurrentUserProviderProps, User } from './CurrentUserProvider.types';

const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [storeUser, setStoreUser] = useState<User | undefined>();
  const [expiration, setExpiration, removeExpiration] = useLocalStorage<number | undefined>(
    'loginExpirationDate',
    undefined,
  );

  const user = useMemo(() => {
    if (expiration && new Date(expiration).getTime() > Date.now()) {
      return storeUser;
    }
    return undefined;
  }, [expiration, storeUser]);

  const setUser = (newUser: User | undefined, expirationDate: number | undefined = undefined) => {
    if (!newUser || !expirationDate) {
      removeExpiration();
    } else {
      setExpiration(expirationDate);
      setStoreUser(newUser);
    }
  };

  return (
    <CurrentUserContext.Provider value={[user, setUser]}>{children}</CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
