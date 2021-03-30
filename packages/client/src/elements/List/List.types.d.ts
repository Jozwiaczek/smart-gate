import { MouseEvent, ReactNode } from 'react';

interface ListHeader {
  label: string;
}

type ListCellValue = string | number | boolean | Date | ReactNode;

type ListId = string | number;

interface ListData<T> {
  id: ListId;
  row: T;
}

interface Pagination {
  page: number;
  perPage?: number;
}

export type OrderVariant = 'ASC' | 'DESC';

interface Sort {
  field: string;
  order: OrderVariant;
}

export interface ListProps<T extends Record<string, unknown>> {
  headers: Array<ListHeader>;
  data: Array<ListData<T>>;
  onRowClick?: (event: MouseEvent) => void;
  total: number;
  filter?: unknown;
  pagination: Pagination;
  sort?: Sort;
}
