export class NullValuesException extends Error {
  constructor() {
    super('Values must not be null!');
    this.name = 'NullValuesException';
  }
}
