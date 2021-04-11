import { MouseEvent, ReactNode } from 'react';

export interface DetailedListProps {
  onRowClick?: (event: MouseEvent) => void;
  resource: string;
  children: ReactNode;
}

type PerPage = 5 | 10 | 15 | 25;
