import { HttpConstants } from '@core/shared/config/constants/http';
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
