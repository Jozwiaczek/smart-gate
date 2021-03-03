import { useContext } from 'react';

import { UserContext } from '../providers/api/UserProvider/UserProvider.context';

const useUser = () => useContext(UserContext);

export default useUser;
