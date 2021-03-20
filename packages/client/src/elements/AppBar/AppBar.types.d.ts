import { ReactNode } from 'react';

export type ItemTitle = 'Dashboard' | 'History' | 'Settings' | 'Admin';

export interface AppBarItem {
  title: ItemTitle;
  icon: ReactNode;
  onlyAdmin?: boolean;
}

export interface StyledIconButtonProps {
  isActive: boolean;
}

export interface ItemLabelProps {
  isActive: boolean;
}
