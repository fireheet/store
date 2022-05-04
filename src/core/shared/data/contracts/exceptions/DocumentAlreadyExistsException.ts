import { HttpConstants } from '@core/shared/config/constants/http';
import { Exception } from './Exception';

export class DocumentAlreadyExistsException extends Exception {
  constructor() {
    super({
      name: 'DocumentAlreadyExistsException',
      message: 'Document already exists!',
      statusCode: HttpConstants.BAD_REQUEST
    });
  }
}
