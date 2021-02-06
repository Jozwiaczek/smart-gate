import 'styled-components';

import { ITheme } from '../theme/Theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends ITheme {}
}
