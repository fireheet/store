import { HttpConstants } from '@core/shared/config/constants/http';
import { Exception } from './Exception';

export class ValidatorNotAvailableException extends Exception {
  constructor(message: string) {
    super({
      message,
      name: 'ValidatorNotAvailableException',
      statusCode: HttpConstants.BAD_REQUEST
    });
  }
}
