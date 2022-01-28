export class InvalidDataException extends Error {
  constructor() {
    super('Provided data is invalid');
    this.name = 'InvalidDataException';
  }
}
