export class InvalidNameException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidNameException';
  }
}
