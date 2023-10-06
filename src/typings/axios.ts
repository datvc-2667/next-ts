export type TResponse<T = unknown> = {
  status: number;
  data: T;
};

export type TErrorResponse = {
  code: string;
  message: string;
  resource?: string;
  field?: string;
};

export type TBadRequestErrorResponse = {
  code: string;
  field: string;
  message: string;
  resource?: string;
};

export type TCustomAxiosRequestConfig = {
  isAuth?: boolean;
};
