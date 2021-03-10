export type STATE = 'loading' | 'error' | 'data';
export interface LazyLoading<T> {
  state: STATE;
  data: T;
}
