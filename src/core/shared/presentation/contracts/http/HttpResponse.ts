import { Exception } from '@core/shared/data/contracts';

export type HttpResponse<T = unknown> = {
  statusCode: number;
  data: T;
};

export const InternalServerError: HttpResponse = {
  statusCode: 500,
  data: new Exception({
    message: 'An internal error occurred, please try again!!',
    name: 'Internal Server Error'
  })
};

export class HttpResponses<T> {
  ok(data: T): HttpResponse<T> {
    return {
      statusCode: 200,
      data
    };
  }

  created(data: T): HttpResponse<T> {
    return {
      statusCode: 201,
      data
    };
  }
}

export const ErrorResponse = (error: Exception): HttpResponse<Exception> => {
  return {
    statusCode: error.statusCode,
    data: error
  };
};
