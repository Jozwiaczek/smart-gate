import React from 'react';

import { useFormatDate } from '../../../hooks';
import { BaseRecordField } from '../Fields.types';
import { DateFieldProps } from './DateField.types';

const DateField = <T extends BaseRecordField>({
  source,
  record,
  showTime,
  style,
}: DateFieldProps<T>) => {
  const formatDate = useFormatDate();

  if (!record || !record[source]) {
    return (
      <p data-testid="dateField" style={style}>
        -
      </p>
    );
  }

  const formatterOptions: Intl.DateTimeFormatOptions = {
    timeStyle: showTime ? 'medium' : undefined,
    dateStyle: 'short',
  };
  const dateLabel = formatDate(record[source], formatterOptions);

  return (
    <p data-testid="dateField" style={style}>
      {dateLabel}
    </p>
  );
};

DateField.displayName = 'DateField';

export default DateField;
