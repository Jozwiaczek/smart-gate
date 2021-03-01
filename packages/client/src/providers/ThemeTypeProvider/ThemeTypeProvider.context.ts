import { createContext } from 'react';

import { ThemeType } from '../../theme/Theme';
import { ThemeTypeContextValue } from './ThemeTypeProvider.types';

export const ThemeTypeContext = createContext<ThemeTypeContextValue>({
  themeType: ThemeType.dark,
  setThemeType: () => null,
  cleanThemeType: () => null,
  setSystemThemeType: () => null,
});
