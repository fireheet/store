import { Document } from '../Document';
import { DocumentType } from '../enums';
import { DocumentProps } from '../types/DocumentProps';
import { DocumentValidatorFactory } from './DocumentValidatorFactory';

export class DocumentFactory {
  static create({ number }: DocumentProps): Document {
    if (number.length === 11) {
      return new Document(
        {
          number,
          type: DocumentType.CPF
        },
        DocumentValidatorFactory.create()
      );
    }

    return new Document(
      {
        number,
        type: DocumentType.CNPJ
      },
      DocumentValidatorFactory.create()
    );
  }
}
