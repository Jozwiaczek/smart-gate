import { CSSProperties, MouseEvent, ReactNode } from 'react';

import { ITheme } from '../../../theme/Theme';

export interface DetailedListProps {
  onRowClick?: (event: MouseEvent) => void;
  resource: string;
  children: ReactNode;
  noDataLabel?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowStyle?: (record: any, theme: ITheme) => CSSProperties | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowCellsStyle?: (record: any, theme: ITheme) => CSSProperties | undefined;
}

type PerPage = 5 | 10 | 15 | 25;
