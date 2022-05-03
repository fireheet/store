import {
  DocumentType,
  Document,
  DocumentValidatorFactory
} from '@core/shared/domain/value-objects';

export class DocumentDataBuilder {
  #documentData: Document;

  constructor() {
    this.#documentData = new Document(
      {
        number: '12345678901',
        type: DocumentType.CPF
      },
      DocumentValidatorFactory.create()
    );
  }

  static aDocument(): DocumentDataBuilder {
    return new DocumentDataBuilder();
  }

  validCPF(): DocumentDataBuilder {
    return this;
  }

  validCNPJ(): DocumentDataBuilder {
    this.#documentData.number = '12345678901234';
    this.#documentData.type = DocumentType.CNPJ;
    return this;
  }

  withoutNumber(): DocumentDataBuilder {
    Reflect.deleteProperty(this.#documentData, 'number');
    return this;
  }

  withoutType(): DocumentDataBuilder {
    Reflect.deleteProperty(this.#documentData, 'type');
    return this;
  }

  longNumber(): DocumentDataBuilder {
    this.#documentData.number = '12345678901234465564';
    return this;
  }

  shortNumber(): DocumentDataBuilder {
    this.#documentData.number = '1564';
    return this;
  }

  invalidCharacters(): DocumentDataBuilder {
    this.#documentData.number = 'a'.repeat(11);
    return this;
  }

  invalidType(): DocumentDataBuilder {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.#documentData.type = 'aaaa';
    return this;
  }

  build(): Document {
    return this.#documentData;
  }
}
