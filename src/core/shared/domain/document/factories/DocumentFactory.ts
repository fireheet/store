import { DocumentProps } from '@core/shared/data/contracts';
import { Document } from '../Document';
import { DocumentType } from '../enums';

export class DocumentFactory {
  static create({ number }: DocumentProps): Document {
    if (number.length === 11) {
      return new Document({
        number,
        type: DocumentType.CPF
      });
    }

    return new Document({
      number,
      type: DocumentType.CNPJ
    });
  }
}
