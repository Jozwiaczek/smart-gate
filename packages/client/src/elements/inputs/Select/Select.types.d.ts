import { ReactNode } from 'react';

interface SelectProps<T> {
  value: T;
  onChange: (selectedOption: SelectOption<T>) => void;
  children: ReactNode;
}

interface SelectOption<T> {
  index: number;
  value: T;
  label: string;
}
