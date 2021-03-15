import { useContext } from 'react';

import { AuthContext } from '../providers/api/AuthProvider/AuthProvider.context';
import { AuthProps } from '../providers/api/AuthProvider/AuthProvider.types';

const useAuth = (): AuthProps => useContext(AuthContext);

export default useAuth;
