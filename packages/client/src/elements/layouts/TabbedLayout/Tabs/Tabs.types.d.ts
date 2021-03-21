import { MouseEvent, ReactElement } from 'react';

import { TabProps } from '../Tab/Tab.types';

type TabMarkerPosition = 'top' | 'bottom' | 'left' | 'right';
type TabsVariant = 'scrollable' | 'fullWidth' | 'default';

interface TabsOpt {
  variant?: TabsVariant;
  indicatorPosition?: TabMarkerPosition;
  indicatorWidth?: number;
  tabWidth?: number;
}

interface TabsProps {
  children: Array<ReactElement<TabProps>> | ReactElement<TabProps>;
  value: number;
  onChange: (event: MouseEvent, newValue: number) => void;
  options?: TabsOpt;
}

interface TabsIndicatorProps {
  left: number;
  width: number;
  position: TabMarkerPosition;
}

interface TabsWrapperProps {
  variant: TabsVariant;
}
