import { HttpConstants } from '@core/shared/config/constants/http';
import { Exception } from './Exception';

export class DocumentAlreadyExistsException extends Exception {
  constructor() {
    super({
      name: 'DocumentAlreadyExistsException',
      message: 'Document already exits!',
      statusCode: HttpConstants.BAD_REQUEST
    });
  }
}
