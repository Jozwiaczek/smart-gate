import React from 'react';

import { BaseRecordField } from '../Fields.types';
import { FunctionFieldParagraph } from './FunctionField.styled';
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
    <FunctionFieldParagraph data-testid="functionField" style={style}>
      {render(record)}
    </FunctionFieldParagraph>
  );
};

FunctionField.displayName = 'FunctionField';

export default FunctionField;
