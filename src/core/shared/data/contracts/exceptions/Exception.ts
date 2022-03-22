/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
interface ExceptionOptions {
  name: string;
  message: string;
  stack?: string;
  statusCode?: number;
}

export class Exception extends Error {
  statusCode;

  constructor({ message, name, statusCode = 500 }: ExceptionOptions) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}
