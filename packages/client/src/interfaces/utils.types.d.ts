import { ITheme } from '../theme/Theme';

type StyledHelperFunc<T> = T & {
  theme: ITheme;
};
