import { HttpConstants } from '@core/shared/config';
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
