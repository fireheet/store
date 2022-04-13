/* eslint-disable import/no-cycle */
import { ValidationException } from '@core/shared/data/contracts';
import { ValueObject } from '../value_object/ValueObject';
import { DocumentType } from './enums';
import { DocumentValidatorFactory } from './factories/DocumentValidatorFactory';

export class Document extends ValueObject {
  number!: string;

  type!: DocumentType;

  constructor(props: Partial<Document>) {
    super();

    Object.assign(this, props);

    this.validateDocument();

    if (this.validation.hasErrors()) {
      throw new ValidationException(this.validation.messages('document'));
    }
  }

  private validateDocument(): void {
    DocumentValidatorFactory.create().validate(this);
  }

  public static validateCPF(_cpf: string): boolean {
    return true;
  }

  public static validateCNPJ(_cnpj: string): boolean {
    return true;
  }

  public formatDocumentNumber(): string {
    return `${this.number}`;
  }

  public getDocumentValues(): Partial<Document> {
    return {
      number: this.number,
      type: this.type
    };
  }

  public override toString(): string {
    return `${this.type},${this.number}`;
  }

  public isEqual(document: Document): boolean {
    return this.toString() === document.toString();
  }
}
