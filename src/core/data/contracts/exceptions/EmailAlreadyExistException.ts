export class EmailAlreadyExistException extends Error {
  constructor() {
    super('Email already exits!');
    this.name = 'EmailAlreadyExistException';
  }
}
