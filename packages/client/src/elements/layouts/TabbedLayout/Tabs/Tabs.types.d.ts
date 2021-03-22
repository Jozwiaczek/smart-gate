import { MouseEvent, ReactElement } from 'react';

import { TabProps } from '../Tab/Tab.types';

type TabMarkerPosition = 'top' | 'bottom' | 'left' | 'right';
type TabsVariant = 'scrollable' | 'fullWidth' | 'default';
type TabsOrientation = 'horizontal' | 'vertical';

interface TabsOpt {
  variant?: TabsVariant;
  orientation?: TabsOrientation;
  indicatorPosition?: TabMarkerPosition;
  indicatorWidth?: number;
  indicatorHeight?: number;
  indicatorThin?: number;
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
  height: number;
  position: TabMarkerPosition;
}

interface TabsWrapperProps {
  variant: TabsVariant;
  orientation?: TabsOrientation;
}

interface GetIndicatorLeft {
  value: number;
  totalChildren: number;
  containerWidth: number;
  tabWidth: number;
  indicatorWidth: number;
  variant: TabsVariant;
}

interface GetIndicatorSizeProps {
  defaultThin: number;
  tabSize: number;
  width?: number;
  height?: number;
  orientation: TabsOrientation;
}

interface IndicatorSize {
  width: number;
  height: number;
}
