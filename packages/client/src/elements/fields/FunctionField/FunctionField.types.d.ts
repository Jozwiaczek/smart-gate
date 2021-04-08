import { ReactNode } from 'react';

import { BaseFieldProps } from '../Fields.types';

interface FunctionFieldProps<T> extends Omit<BaseFieldProps<T>, 'source'> {
  render: (record: T) => string | ReactNode;
}
