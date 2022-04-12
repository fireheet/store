/* eslint-disable import/no-cycle */
import * as yup from 'yup';
import { NAME_MAX_LENGTH } from '@core/owner/config/constants';
import { DocumentType } from '@core/shared/domain';
import { Validator } from '@core/shared/data';
import { Owner } from '../entities/Owner';

export class OwnerYupValidator implements Validator<Owner> {
  public validate(entity: Owner): void {
    try {
      yup
        .object()
        .shape({
          name: yup
            .string()
            .max(
              NAME_MAX_LENGTH,
              `Name must be ${NAME_MAX_LENGTH} characters or less`
            )
            .required('Name is required'),
          document: yup.object().shape({
            type: yup
              .string()
              .oneOf([DocumentType.CPF, DocumentType.CNPJ])
              .required('Document type is required'),
            number: yup
              .string()
              .min(11)
              .max(11)
              .required('Document number is required')
          })
        })
        .validateSync(
          {
            name: entity.name,
            document: entity.document
          },
          {
            abortEarly: false
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach(error => {
        entity.validation.addError({
          context: 'owner',
          message: error
        });
      });
    }
  }
}
