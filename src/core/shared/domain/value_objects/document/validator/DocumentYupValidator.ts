import * as yup from 'yup';
import { Validator } from '@core/shared/domain/contracts';
import { Document } from '../Document';
import { DocumentType } from '../enums';

export class DocumentYupValidator implements Validator<Document> {
  public validate(entity: Document): void {
    try {
      yup
        .object()
        .shape({
          type: yup
            .string()
            .oneOf([DocumentType.CPF, DocumentType.CNPJ])
            .required(),
          number: yup
            .string()
            .matches(/^[0-9]*$/, 'document number has invalid characters')
            .min(11)
            .max(14)
            .required()
        })
        .validateSync(
          {
            type: entity.type,
            number: entity.number
          },
          {
            abortEarly: false
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach(error => {
        entity.validation.addError({
          context: 'document',
          message: error
        });
      });
    }
  }
}
