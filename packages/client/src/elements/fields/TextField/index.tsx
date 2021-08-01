import React from 'react';
import { useTranslation } from 'react-i18next';

import { BaseRecordField } from '../Fields.types';
import { Label, Wrapper } from './TextField.styled';
import { TextFieldProps } from './TextField.types';

const TextField = <T extends BaseRecordField>({ source, record, label }: TextFieldProps<T>) => {
  const { t } = useTranslation();

  if (!record) {
    return null;
  }

  return (
    <Wrapper>
      {label && <Label>{t(label as never)}</Label>}
      <p data-testid="textField">{record[source] ?? <strong>-</strong>}</p>
    </Wrapper>
  );
};

TextField.displayName = 'TextField';

export default TextField;
