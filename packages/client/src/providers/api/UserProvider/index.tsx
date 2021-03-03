import React, { PropsWithChildren, useCallback, useState } from 'react';

import useLocalStorage from '../../../hooks/useLocalStorage';
import { UserContext } from './UserProvider.context';
import { User } from './UserProvider.types';

const UserProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [user, setNewUser] = useState<User | undefined>();
  const [expiration, setExpiration, removeExpiration] = useLocalStorage<number | undefined>(
    'loginExpirationDate',
    undefined,
  );

  const getUser = useCallback(() => {
    if (expiration && new Date(expiration).getTime() > Date.now()) {
      return user;
    }
    return undefined;
  }, [expiration, user]);

  const setUser = (newUser: User | undefined, expirationDate: number | undefined = undefined) => {
    if (!newUser || !expirationDate) {
      removeExpiration();
    } else {
      setExpiration(expirationDate);
      setNewUser(newUser);
    }
  };

  return <UserContext.Provider value={{ getUser, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
