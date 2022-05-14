import * as yup from 'yup';
import { Validator } from '@core/shared/domain/contracts';
import { Price } from '..';

export class PriceYupValidator implements Validator<Price> {
  public validate(object: Price): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().max(1).min(1).required()
        })
        .validateSync(
          {
            value: object.value
          },
          {
            abortEarly: false
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach(error => {
        object.entity.notification.addError({
          context: 'price',
          message: error
        });
      });
    }
  }
}
