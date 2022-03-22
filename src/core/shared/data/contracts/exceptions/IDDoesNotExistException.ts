import { Exception } from './Exception';

export class IDDoesNotExistException extends Exception {
  constructor() {
    super({
      name: 'IDDoesNotExistException',
      message: 'ID does not exist!',
      statusCode: 400
    });
  }
}
