export type ValidationErrorProps = {
  context: string;
  message: string;
};

export class Validation {
  private context = '';

  private errors: ValidationErrorProps[] = [];

  constructor(context: string) {
    this.context = context;
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public addError(error: ValidationErrorProps) {
    this.errors.push(error);
  }

  public messages(): string {
    let message = '';

    this.errors.forEach(error => {
      if (error.context === this.context) {
        message += `${error.message}, `;
      }
    });

    return message.slice(0, message.length - 2);
  }

  public allMessages(): string {
    let message = '';

    this.errors.forEach(error => {
      message += `${error.message}, `;
    });

    return message.slice(0, message.length - 2);
  }
}
