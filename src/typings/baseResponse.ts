export interface IMeta {
  take: number;
  total: number;
  currentPage: number;
}

export interface ICursorMeta {
  take: number;
  remain?: number;
}

export interface IResponse<T, TMeta = IMeta> {
  data: Array<T>;
  meta: TMeta;
}
