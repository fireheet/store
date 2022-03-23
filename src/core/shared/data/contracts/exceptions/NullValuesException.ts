import { Exception } from './Exception';

export class NullValuesException extends Exception {
  constructor() {
    super({
      name: 'NullValuesException',
      message: 'Null values are not allowed!',
      statusCode: 400
    });
  }
}