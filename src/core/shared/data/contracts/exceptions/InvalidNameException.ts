import { HttpConstants } from '@core/shared/config';
import { Exception } from './Exception';

export class InvalidNameException extends Exception {
  constructor(message: string) {
    super({
      name: 'InvalidNameException',
      message,
      statusCode: HttpConstants.BAD_REQUEST
    });
  }
}
