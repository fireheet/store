import { Exception } from './Exception';

export class InvalidDocumentException extends Exception {
  constructor(message: string) {
    super({
      name: 'InvalidDocumentException',
      message,
      statusCode: 400
    });
  }
}
