import { createContext } from 'react';

import { CurrentUserContextValue } from './CurrentUserProvider.types';

export const CurrentUserContext = createContext<CurrentUserContextValue>([undefined, () => {}]);
