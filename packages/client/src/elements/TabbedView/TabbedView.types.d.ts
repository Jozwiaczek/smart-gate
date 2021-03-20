import { MouseEvent, ReactElement, ReactNode } from 'react';

type TabMarkerPosition = 'top' | 'bottom' | 'left' | 'right';

interface TabsOpt {
  tabIndicatorPosition?: TabMarkerPosition;
  tabIndicatorSize?: number;
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

interface TabProps {
  label: string;
  icon?: ReactNode;
  onlyAdmin?: boolean;
  value?: number;
  onChange?: (event: MouseEvent, newValue: number) => void;
  index?: number;
  tabWidth?: number;
}

interface TabPanelProps {
  value: number;
  index: number;
  children: ReactNode;
}
