import { HttpConstants } from '@core/shared/config/constants/http';
import { Exception } from './Exception';

export class InvalidParameterException extends Exception {
  constructor(parameterName: string) {
    super({
      name: 'InvalidParameterException',
      message: `Parameter ${parameterName} is invalid!`,
      statusCode: HttpConstants.BAD_REQUEST
    });
  }
}
