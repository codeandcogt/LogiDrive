export interface ApiResponse<T> {
  code: number | string;
  message: string;
  data: T;
}

export interface Option {
  label: string;
  value: string;
}
