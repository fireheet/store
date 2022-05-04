interface ExceptionOptions {
  name: string;
  message: string;
  stack?: string;
  statusCode?: number;
}

export class Exception extends Error {
  statusCode;

  constructor({ message, name, statusCode = 500, stack }: ExceptionOptions) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.stack = stack;
  }
}
