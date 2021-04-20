import { BaseApiResource } from '../../interfaces/api.types';

interface BaseFieldProps<T> {
  label?: string;
  source: keyof T;
  record?: T;
  asTitle?: boolean;
  noLabel?: boolean;
  noTranslation?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseRecordField = Record<string, any> & BaseApiResource;
