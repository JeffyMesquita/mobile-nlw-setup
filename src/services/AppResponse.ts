interface AppResponse {
  message: string;
  result: string | 'success' | 'error';
  data?: any;
}

export type { AppResponse };
