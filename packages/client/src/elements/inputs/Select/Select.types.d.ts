import { ReactNode } from 'react';

type SelectOpenDirection = 'up' | 'down';

interface SelectProps<T> {
  value: T;
  onChange: (selectedOption: SelectOption<T>) => void;
  children: ReactNode;
  openDirection?: SelectOpenDirection;
}

interface SelectOption<T> {
  index: number;
  value: T;
  label: string;
}
