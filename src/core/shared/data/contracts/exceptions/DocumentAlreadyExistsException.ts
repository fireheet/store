export class DocumentAlreadyExistsException extends Error {
  constructor() {
    super('Document already exits!');
    this.name = 'DocumentAlreadyExistsException';
  }
}
