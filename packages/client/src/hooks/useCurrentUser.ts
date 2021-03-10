import { useContext } from 'react';

import { CurrentUserContext } from '../providers/api/CurrentUserProvider/CurrentUserProvider.context';
import { CurrentUserContextValue } from '../providers/api/CurrentUserProvider/CurrentUserProvider.types';

const useCurrentUser = (): CurrentUserContextValue => useContext(CurrentUserContext);

export default useCurrentUser;
