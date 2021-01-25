export interface GetList<T> extends ListResourceBase<T> {
  data: Array<T>;
  total: number;
  validUntil?: Date;
}
