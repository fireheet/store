import { DocumentType } from './types/DocumentType';

export class Document {
  number!: string;

  type!: DocumentType;

  constructor(data: Partial<Document>) {
    Object.assign(this, data);

    this.validateDocument();
  }

  validateDocument(): void {
    if (!(this.number && this.type)) {
      throw new Error('Document values must not be null!');
    }

    if (this.validateNumberByType()) {
      throw new Error(
        `Document number not valid with type "${this.getDocumentTypeString()}`,
      );
    }
  }

  validateNumberByType(): boolean {
    switch (this.type) {
      case DocumentType.CPF:
        return this.validateCPF(this.number);
      case DocumentType.CNPJ:
        return this.validateCPNJ(this.number);
      default:
        return false;
    }
  }

  validateCPF(cpf: string): boolean {
    // TODO Implement CPF validation

    return true;
  }

  validateCPNJ(cnpj: string): boolean {
    // TODO Implement CNPJ validation

    return true;
  }

  formatDocumentNumber(): string {
    // TODO Return formatted document number

    return this.number;
  }

  getDocumentValues(): Partial<Document> {
    return {
      number: this.number,
      type: this.type,
    };
  }

  getDocumentTypeString(): string {
    return this.type.toString();
  }

  public toString(): string {
    return `${this.type},${this.number}`;
  }

  public isEqual(document: Document): boolean {
    return this.toString() === document.toString();
  }
}
