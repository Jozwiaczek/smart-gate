import { ReactNode } from 'react';

interface ExpandoContainerProps {
  header: ReactNode;
  children: ReactNode;
  visibleFromDefault?: boolean;
}

interface ContentProps {
  open: boolean;
  contentHeight: number;
}

interface StyledChevronDownIconProps {
  open: boolean;
}
