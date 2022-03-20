export type HttpResponse<T = unknown> = {
  statusCode: number;
  data: T;
};

export const HttpServerError = (error: Error): HttpResponse<string> => {
  return {
    statusCode: 500,
    data: error.message
  };
};

export class HttpResponses<T> {
  httpCreated(data: T): HttpResponse<T> {
    return {
      statusCode: 201,
      data
    };
  }
}
