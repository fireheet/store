/* eslint-disable import/no-cycle */
import { Validator } from '@core/shared/data';
import { Document } from '../Document';
import { DocumentYupValidator } from '../validator/DocumentYupValidator';

export class DocumentValidatorFactory {
  static create(): Validator<Document> {
    return new DocumentYupValidator();
  }
}
