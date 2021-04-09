import { MouseEvent, ReactElement } from 'react';

// eslint-disable-next-line import/no-cycle
import { TabProps } from '../Tab/Tab.types';

type TabMarkerPosition = 'top' | 'bottom' | 'left' | 'right';
type TabsVariant = 'scrollable' | 'fullWidth' | 'default';
type TabsOrientation = 'horizontal' | 'vertical';

interface TabsOptions {
  variant?: TabsVariant;
  orientation?: TabsOrientation;
  indicatorPosition?: TabMarkerPosition;
  indicatorWidth?: number;
  indicatorHeight?: number;
  indicatorThin?: number;
  tabWidth?: number;
  tabHeight?: number;
}

type OnChange = (event: MouseEvent, newValue: number) => void;
interface TabsProps {
  children: Array<ReactElement<TabProps>> | ReactElement<TabProps>;
  value: number;
  onChange: OnChange;
  options?: TabsOptions;
}

interface TabsIndicatorProps {
  animationSpace: number;
  width: number;
  height: number;
  position: TabMarkerPosition;
  orientation: TabsOrientation;
}

interface TabsWrapperProps {
  variant: TabsVariant;
  orientation?: TabsOrientation;
}

interface GetIndicatorAnimationSpace {
  value: number;
  totalChildren: number;
  containerSize: number;
  tabSize: number;
  indicatorSize: number;
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
interface DisplayScroll {
  start: boolean;
  end: boolean;
}
type ScrollDirectionType = 'start' | 'end';

interface ScrollButtonWrapperProps {
  displayType: ScrollDirectionType;
  orientation: TabsOrientation;
}
