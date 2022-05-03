import { Validator } from '@core/shared/domain/contracts';
import { Document } from '../Document';
import { DocumentYupValidator } from '../validator';

export class DocumentValidatorFactory {
  static create(): Validator<Document> {
    return new DocumentYupValidator();
  }
}
