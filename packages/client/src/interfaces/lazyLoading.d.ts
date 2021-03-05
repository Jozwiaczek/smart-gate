export interface LazyLoading<T> {
  loading: boolean;
  data: T;
  error: boolean;
}
