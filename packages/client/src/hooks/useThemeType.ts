import { useContext } from 'react';

import { ThemeTypeContext } from '../providers/ThemeTypeProvider';
import { ThemeTypeContextValue } from '../providers/ThemeTypeProvider/ThemeTypeProvider.types';

const useThemeType = (): ThemeTypeContextValue => useContext(ThemeTypeContext);

export default useThemeType;
