import React, { PropsWithChildren, useState } from 'react';

import useLocalStorage from '../../../hooks/useLocalStorage';
import { UserContext } from './UserProvider.context';
import { User } from './UserProvider.types';

const UserProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [user, setNewUser] = useState<User | undefined>();
  const [expiration, setExpiration] = useLocalStorage<number | undefined>(
    'loginExpirationDate',
    undefined,
  );

  const getUser = () => {
    if (expiration && new Date(expiration).getTime() > Date.now()) {
      return user;
    }
    return undefined;
  };

  const setUser = (newUser: User | undefined, expirationDate: number | undefined = undefined) => {
    if (!newUser && expiration) {
      setExpiration(undefined);
    }
    setExpiration(expirationDate);
    setNewUser(newUser);
  };

  return <UserContext.Provider value={{ getUser, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
