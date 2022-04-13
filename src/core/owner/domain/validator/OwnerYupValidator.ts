/* eslint-disable import/no-cycle */
import * as yup from 'yup';
import { NAME_MAX_LENGTH } from '@core/owner/config/constants';
import { Validator } from '@core/shared/data';
import { Owner } from '../entities/Owner';

export class OwnerYupValidator implements Validator<Owner> {
  public validate(entity: Owner): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().max(NAME_MAX_LENGTH).required(),
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
