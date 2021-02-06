import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { ITheme } from '../theme/Theme';

const useTheme = (): ITheme => {
  return useContext(ThemeContext);
};

export default useTheme;
