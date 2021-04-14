import { MouseEvent, ReactNode } from 'react';

export interface DetailedListProps {
  onRowClick?: (event: MouseEvent) => void;
  resource: string;
  children: ReactNode;
  sortable?: boolean;
}

type PerPage = 5 | 10 | 15 | 25;
