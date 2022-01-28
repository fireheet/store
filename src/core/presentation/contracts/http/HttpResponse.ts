export type HttpResponse<T = any> = {
  statusCode: number;
  data: T;
};

export const HttpServerError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    data: error.message,
  };
};

export const HttpCreated = (data: unknown): HttpResponse => {
  return {
    statusCode: 201,
    data,
  };
};
