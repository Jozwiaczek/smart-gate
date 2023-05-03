import { ReactNode } from 'react';

import { BaseRecordField } from '../../../../fields/Fields.types';
import { DetailedListProps } from '../../DetailedList.types';

interface DetailedListRowProps
  extends Omit<DetailedListProps, 'resource' | 'children' | 'noDataLabel'> {
  record: BaseRecordField;
  onMarkRow: (recordId: string) => void;
  checkIsRowSelected: (recordId: string) => boolean;
  childrenProps: ReactNode;
}
