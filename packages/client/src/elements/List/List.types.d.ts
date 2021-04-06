import { MouseEvent, ReactNode } from 'react';

export interface ListProps {
  onRowClick?: (event: MouseEvent) => void;
  resource: string;
  children: ReactNode;
}
