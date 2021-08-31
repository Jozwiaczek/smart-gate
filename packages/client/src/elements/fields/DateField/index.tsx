import React from 'react';
import { useTranslation } from 'react-i18next';

import { BaseRecordField } from '../Fields.types';
import { DateFieldProps } from './DateField.types';

const DateField = <T extends BaseRecordField>({
  source,
  record,
  showTime,
  style,
}: DateFieldProps<T>) => {
  const { i18n } = useTranslation();

  if (!record || !record[source]) {
    return (
      <p data-testid="dateField" style={style}>
        -
      </p>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const date = new Date(record[source].toString());
  const formatter = new Intl.DateTimeFormat(i18n.language, {
    timeStyle: showTime ? 'medium' : undefined,
    dateStyle: 'short',
  });
  const formattedDate = formatter.format(date);

  return (
    <p data-testid="dateField" style={style}>
      {formattedDate}
    </p>
  );
};

DateField.displayName = 'DateField';

export default DateField;
