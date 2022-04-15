import { HttpConstants } from '@core/shared/config/constants/http';
import { Exception } from './Exception';

export class IDDoesNotExistException extends Exception {
  constructor() {
    super({
      name: 'IDDoesNotExistException',
      message: 'ID does not exist!',
      statusCode: HttpConstants.BAD_REQUEST
    });
  }
}
