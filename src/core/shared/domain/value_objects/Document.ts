import { InvalidDocumentException } from '@core/shared/data/contracts';
import { DocumentType } from './enums';

export class Document {
  number!: string;

  type!: DocumentType;

  constructor(data: Partial<Document>) {
    Object.assign(this, data);

    this.validateDocument();
  }

  private validateDocument(): void {
    if (!this.number || !this.type) {
      throw new Error();
    }

    if (!this.validateNumberByType()) {
      throw new InvalidDocumentException(
        `Document number not valid with type "${this.getDocumentTypeString()}`
      );
    }
  }

  private validateNumberByType(): boolean {
    switch (this.type) {
      case DocumentType.CPF:
        return this.validateCPF(this.number);
      case DocumentType.CNPJ:
        return this.validateCNPJ(this.number);
      default:
        return false;
    }
  }

  private validateCPF(_cpf: string): boolean {
    return true;
  }

  private validateCNPJ(_cnpj: string): boolean {
    // TODO Implement CNPJ validation

    return true;
  }

  public formatDocumentNumber(): string {
    // TODO Return formatted document number

    return `${this.number}`;
  }

  public getDocumentValues(): Partial<Document> {
    return {
      number: this.number,
      type: this.type
    };
  }

  private getDocumentTypeString(): string {
    return this.type.toString();
  }

  public toString(): string {
    return `${this.type},${this.number}`;
  }

  public isEqual(document: Document): boolean {
    return this.toString() === document.toString();
  }
}
