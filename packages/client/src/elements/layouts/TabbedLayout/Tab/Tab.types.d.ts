import { MouseEvent, ReactNode } from 'react';

type TabsVariant = 'scrollable' | 'fullWidth' | 'default';

interface TabProps {
  label?: string;
  icon?: ReactNode;
  onlyAdmin?: boolean;
  value?: number;
  onChange?: (event: MouseEvent, newValue: number) => void;
  index?: number;
  tabWidth?: number;
  variant?: TabsVariant;
}

interface TabButtonProps {
  width: number;
  isActive: boolean;
  variant: TabsVariant;
}

interface TabLabelProps {
  isActive: boolean;
}
