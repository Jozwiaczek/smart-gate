import { ReactNode } from 'react';

import { TabProps } from '../layouts/TabbedLayout/Tab/Tab.types';

interface AppBarItem extends TabProps {
  index: number;
  indexMobile?: number;
  component: ReactNode;
  path: string | Array<string>;
  exact?: boolean;
}

interface AppBarProps {
  tabs?: Array<AppBarItem>;
}
