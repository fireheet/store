import { HttpConstants } from '@core/shared/config';
import { Exception } from './Exception';

export class ValidationException extends Exception {
  constructor(message: string) {
    super({
      message,
      name: 'ValidationException',
      statusCode: HttpConstants.BAD_REQUEST
    });
  }
}
