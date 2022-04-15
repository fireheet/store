import { HttpConstants } from '@core/shared/config/constants/http';
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
