import { ReactNode } from 'react';

// eslint-disable-next-line import/no-cycle
import { OnChange } from '../Tabs/Tabs.types';

type TabsVariant = 'scrollable' | 'fullWidth' | 'default';
type TabsOrientation = 'horizontal' | 'vertical';

interface TabProps {
  label?: string;
  icon?: ReactNode;
  onlyAdmin?: boolean;
  value?: number;
  onChange?: OnChange;
  index?: number;
  tabWidth?: number;
  tabHeight?: number;
  variant?: TabsVariant;
  orientation?: TabsOrientation;
}

interface TabButtonProps {
  width: string;
  height: string;
  isActive: boolean;
  variant: TabsVariant;
}

interface TabLabelProps {
  isActive: boolean;
}

interface ScrollButtonProps {
  orientation: TabsOrientation;
}
