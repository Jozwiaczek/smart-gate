import { useContext } from 'react';

import { CurrentUserContext } from '../providers/api/CurrentUserProvider/CurrentUserProvider.context';

const useCurrentUser = () => useContext(CurrentUserContext);

export default useCurrentUser;
