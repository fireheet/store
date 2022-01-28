export class InvalidBirthdateException extends Error {
  constructor() {
    super('Provided birthdate is invalid');
    this.name = 'InvalidBirthdateException';
  }
}
