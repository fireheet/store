import { HttpConstants } from '@core/shared/config/constants/http';
import { Exception } from './Exception';

export class InvalidValidatorException extends Exception {
  constructor(message: string) {
    super({
      message,
      name: 'InvalidValidatorException',
      statusCode: HttpConstants.BAD_REQUEST
    });
  }
}
