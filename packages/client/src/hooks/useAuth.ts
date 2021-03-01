import { useContext } from 'react';

import { AuthContext } from '../providers/api/AuthProvider';

const useAuth = () => useContext(AuthContext);

export default useAuth;
