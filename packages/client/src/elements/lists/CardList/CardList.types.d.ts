import { ReactNode } from 'react';

interface CardListProps {
  children: ReactNode;
  resource: string;
  actionButton?: ReactNode;
}
