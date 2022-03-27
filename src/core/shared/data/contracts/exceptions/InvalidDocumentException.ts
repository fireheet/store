import { HttpConstants } from '@core/shared/config';
import { Exception } from './Exception';

export class InvalidDocumentException extends Exception {
  constructor(message: string) {
    super({
      name: 'InvalidDocumentException',
      message,
      statusCode: HttpConstants.BAD_REQUEST
    });
  }
}
