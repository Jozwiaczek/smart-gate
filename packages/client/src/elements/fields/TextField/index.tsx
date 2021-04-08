import React from 'react';

import { BaseRecordField } from '../Fields.types';
import { TextFieldProps } from './TextField.types';

const TextField = <T extends BaseRecordField>({ source, record }: TextFieldProps<T>) => {
  if (!record) {
    return null;
  }

  return <p data-testid="textField">{record[source]}</p>;
};

TextField.displayName = 'TextField';

export default TextField;
