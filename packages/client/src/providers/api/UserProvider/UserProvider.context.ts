import { createContext } from 'react';

import { UserContextValue } from './UserProvider.types';

export const UserContext = createContext<UserContextValue>({
  getUser: () => {
    return undefined;
  },
  setUser: () => {},
});
