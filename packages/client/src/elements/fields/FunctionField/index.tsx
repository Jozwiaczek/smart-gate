import React from 'react';

import { BaseRecordField } from '../Fields.types';
import { FunctionFieldContainer } from './FunctionField.styled';
import { FunctionFieldProps } from './FunctionField.types';

const FunctionField = <T extends BaseRecordField>({
  render,
  record,
  style,
}: FunctionFieldProps<T>) => {
  if (!record) {
    return null;
  }

  return (
    <FunctionFieldContainer data-testid="functionField" style={style}>
      {render(record)}
    </FunctionFieldContainer>
  );
};

FunctionField.displayName = 'FunctionField';

export default FunctionField;
