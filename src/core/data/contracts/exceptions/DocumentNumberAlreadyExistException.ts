export class DocumentNumberAlreadyExistException extends Error {
  constructor() {
    super('Document Number already exits!');
    this.name = 'DocumentNumberAlreadyExistException';
  }
}
