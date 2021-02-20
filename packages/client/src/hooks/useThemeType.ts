import { useContext } from 'react';

import { ThemeTypeContext, ThemeTypeContextValue } from '../providers/ThemeTypeProvider';

const useThemeType = (): ThemeTypeContextValue => useContext(ThemeTypeContext);

export default useThemeType;
