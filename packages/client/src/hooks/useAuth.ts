import { useContext } from 'react';

import { AuthContext } from '../api/AuthProvider';

const useAuth = () => useContext(AuthContext);

export default useAuth;
