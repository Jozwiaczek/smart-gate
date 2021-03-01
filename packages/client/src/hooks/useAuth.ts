import { useContext } from 'react';

import { AuthContext } from '../providers/api/AuthProvider/AuthProvider.context';

const useAuth = () => useContext(AuthContext);

export default useAuth;
