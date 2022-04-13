export type ValidationErrorProps = {
  context: string;
  message: string;
};

export class Validation {
  private errors: ValidationErrorProps[] = [];

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public addError(error: ValidationErrorProps) {
    this.errors.push(error);
  }

  public messages(context?: string): string {
    let message = '';

    if (context) {
      this.errors.forEach(error => {
        if (error.context === context) {
          message += `${error.message}, `;
        }
      });

      return message.slice(0, message.length - 2);
    }

    this.errors.forEach(error => {
      message += `${error.context}:${error.message}, `;
    });

    return message.slice(0, message.length - 2);
  }
}
