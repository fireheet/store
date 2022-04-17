import * as yup from 'yup';
import { NAME_MAX_LENGTH } from '@core/owner/config/constants';
import { Validator } from '@core/shared/domain/contracts';
import { Owner } from '../../entities';

export class OwnerYupValidator implements Validator<Owner> {
  public validate(entity: Owner): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().uuid('ID is not valid').required(),
          name: yup
            .string()
            .max(NAME_MAX_LENGTH)
            .matches(
              /^([a-zA-Z\s\W]+[^0-9!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?])$/,
              'name has invalid characters'
            )
            .required(),
          document: yup.object({
            number: yup
              .string()
              .matches(/^[0-9]*$/)
              .length(11)
              .required()
          })
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
