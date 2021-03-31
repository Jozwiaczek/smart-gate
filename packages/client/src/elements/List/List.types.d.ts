import { MouseEvent } from 'react';

import { BaseApiResource } from '../../interfaces/api.types';

interface ListHeader {
  key: string;
  label?: string;
}

interface Row<T> {
  id: string;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseListData = Record<string, any> & BaseApiResource;

export interface ListProps<T extends BaseListData> {
  headers: Array<ListHeader>;
  data: Array<T>;
  onRowClick?: (event: MouseEvent) => void;
  total: number;
  filter?: unknown;
  pagination: Pagination;
  sort?: Sort;
}
