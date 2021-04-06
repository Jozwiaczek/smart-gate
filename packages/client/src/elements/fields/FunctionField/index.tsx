import React from 'react';

import { BaseRecordField } from '../Fields.types';
import { FunctionFieldProps } from './FunctionField.types';

const FunctionField = <T extends BaseRecordField>({ render, record }: FunctionFieldProps<T>) => {
  if (!record) {
    return null;
  }

  return <p data-testid="functionField">{render(record)}</p>;
};

FunctionField.displayName = 'FunctionField';

export default FunctionField;
