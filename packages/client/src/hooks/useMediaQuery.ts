import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import { ITheme } from '../theme/Theme';

type QueryInput = string | ((theme: ITheme) => string);

const useMediaQuery = (queryInput: QueryInput) => {
  const theme = useTheme();

  const query = (typeof queryInput === 'function' ? queryInput(theme) : queryInput).replace(
    /^@media( ?)/m,
    '',
  );

  const isBrowser = () => typeof window !== 'undefined';

  const [match, setMatch] = useState(() => {
    if (!isBrowser()) {
      return false;
    }

    return matchMedia(query).matches;
  });

  useEffect(() => {
    let active = true;
    if (!isBrowser()) {
      setMatch(false);
      return () => {
        active = false;
      };
    }

    const queryList = matchMedia(query);
    const updateMatch = () => {
      if (active) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();
    queryList.addListener(updateMatch);
    return () => {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query]);

  return match;
};

export default useMediaQuery;
