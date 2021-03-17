export type LazyLoadingState = 'loading' | 'error' | 'data';
export interface LazyLoading<T> {
  state: LazyLoadingState;
  data: T;
}
