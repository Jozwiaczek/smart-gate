import { createContext } from 'react';

import { AuthProps } from './AuthProvider.types';

export const AuthContext = createContext<AuthProps | undefined>(undefined);
