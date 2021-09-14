import { useMemo } from 'react';

import { isAdmin } from '../utils';
import useCurrentUser from './useCurrentUser';

const useIsCurrentUserAdmin = (): boolean => {
  const [currentUser] = useCurrentUser();
  return useMemo(() => isAdmin(currentUser?.roles), [currentUser?.roles]);
};

export default useIsCurrentUserAdmin;
