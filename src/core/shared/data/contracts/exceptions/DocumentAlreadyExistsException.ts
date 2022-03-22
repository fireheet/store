import { Exception } from './Exception';

export class DocumentAlreadyExistsException extends Exception {
  constructor() {
    super({
      name: 'DocumentAlreadyExistsException',
      message: 'Document already exits!',
      statusCode: 400
    });
  }
}
