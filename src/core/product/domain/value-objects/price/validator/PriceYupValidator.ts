import * as yup from 'yup';
import { Validator } from '@core/shared/domain/contracts';
import { Price } from '..';

export class PriceYupValidator implements Validator<Price> {
  public validate(entity: Price): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().max(1).min(1).required()
        })
        .validateSync(
          {
            value: entity.value
          },
          {
            abortEarly: false
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach(error => {
        entity.notification.addError({
          context: 'price',
          message: error
        });
      });
    }
  }
}
