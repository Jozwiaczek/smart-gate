import { MouseEvent, ReactNode } from 'react';

export interface DetailedListProps {
  onRowClick?: (event: MouseEvent) => void;
  resource: string;
  children: ReactNode;
}
