import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router';

import { TabProps } from '../layouts/TabbedLayout/Tab/Tab.types';

interface AppBarItem extends TabProps {
  index: number;
  indexMobile?: number;
  component: ComponentType<RouteComponentProps<unknown>> | ComponentType<unknown>;
  path: string | Array<string>;
  exact?: boolean;
}

interface AppBarProps {
  tabs?: Array<AppBarItem>;
}
