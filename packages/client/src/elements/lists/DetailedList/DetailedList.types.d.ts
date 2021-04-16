import { MouseEvent, ReactNode } from 'react';

import { ITheme } from '../../../theme/Theme';

export interface DetailedListProps {
  onRowClick?: (event: MouseEvent) => void;
  resource: string;
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowStyle?: (record: any, theme: ITheme) => CSSProperties;
  sortable?: boolean;
}

type PerPage = 5 | 10 | 15 | 25;
