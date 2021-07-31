import { ReactNode } from 'react';

interface SelectCardOption<T> {
  index: number;
  value: T;
  children?: string | ReactNode;
  dataTestId: string;
}

interface SelectCardProps<T> {
  value: T;
  onChange?: (selectedOption: SelectCardOption<T>) => void;
  children: ReactNode;
}
