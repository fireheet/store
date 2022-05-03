import {
  InvalidValidatorException,
  ValidationException
} from '@core/shared/data/contracts';
import { ValueObject } from '@core/shared/domain/value-objects/ValueObject';
import { Validator } from '@core/shared/domain/contracts';
import { DocumentType } from './enums';

export class Document extends ValueObject {
  number!: string;

  type!: DocumentType;

  constructor(
    props: Partial<Document>,
    private readonly validator: Validator<Document>
  ) {
    super();

    Object.assign(this, props);

    this.#validateDocument();

    if (this.notification.hasErrors()) {
      throw new ValidationException(this.notification.messages('document'));
    }
  }

  #validateDocument(): void {
    /* istanbul ignore next */
    if (!this.validator) {
      /* istanbul ignore next */
      throw new InvalidValidatorException('Document Validator is invalid.');
    }

    this.validator.validate(this);
  }

  /**
   * @returns the formatted string for different document types
   * @example '12345678901' -> '123.456.789-01'
   */
  public formatDocumentNumber(): string {
    return `${this.number}`;
  }

  public getDocument(): Partial<Document> {
    return {
      number: this.number,
      type: this.type
    };
  }

  /**
   * @returns this instance document number
   */
  public getNumber(): string {
    return this.number;
  }

  /**
   * @returns this instance document type
   */
  public getType(): string {
    return this.type.toString();
  }

  public override toString(): string {
    return `${this.type},${this.number}`;
  }

  /**
   * @param document
   * @returns true if document is equal to this instance
   */
  public isDocumentEqual(document: Document): boolean {
    return this.toString() === document.toString();
  }

  /**
   * @param cpfNumber
   * @returns true if cpfNumber is equal to the cpf number of this instance
   */
  public isEqualCPF(cpfNumber: string): boolean {
    return this.number === cpfNumber;
  }

  /**
   * @param cpfNumber
   * @returns true if cnpjNumber is equal to the cnpj number of this instance
   */
  public isEqualCNPJ(cnpjNumber: string): boolean {
    return this.number === cnpjNumber;
  }
}
