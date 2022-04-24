import * as yup from 'yup';
import { NAME_MAX_LENGTH, NAME_REGEX } from '@core/owner/config/constants';
import { Validator } from '@core/shared/domain/contracts';
import { DOCUMENT_NUMBER_REGEX } from '@core/shared/config/constants';
import { Owner } from '@core/owner/domain/entities';

export class OwnerYupValidator implements Validator<Owner> {
  public validate(entity: Owner): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().uuid('id is not valid').required(),
          name: yup
            .string()
            .max(NAME_MAX_LENGTH)
            .matches(NAME_REGEX, 'name has invalid characters')
            .required(),
          document: yup
            .object({
              number: yup
                .string()
                .matches(DOCUMENT_NUMBER_REGEX, 'document.number is invalid')
                .length(11)
                .required(),
              type: yup
                .string()
                .oneOf(['CPF'], 'document.type must be CPF')
                .required()
            })
            .required()
        })
        .validateSync(
          {
            id: entity.id,
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
        entity.notification.addError({
          context: 'owner',
          message: error
        });
      });
    }
  }
}
