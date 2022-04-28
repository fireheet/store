import { Exception } from '@core/shared/data/contracts';
import { HttpConstants } from '@core/shared/config/constants/http';

export type HttpResponse<T = unknown> = {
  statusCode: number;
  data: T;
};

export const InternalServerError: HttpResponse = {
  statusCode: HttpConstants.INTERNAL_SERVER_ERROR,
  data: new Exception({
    message: 'An internal error occurred, please try again!!',
    name: 'Internal Server Error'
  })
};

export class HttpResponses<T> {
  ok(data: T): HttpResponse<T> {
    return {
      statusCode: HttpConstants.OK,
      data
    };
  }

  created(data: T): HttpResponse<T> {
    return {
      statusCode: HttpConstants.CREATED,
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
