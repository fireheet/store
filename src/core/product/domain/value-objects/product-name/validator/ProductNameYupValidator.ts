import * as yup from 'yup';
import { Validator } from '@core/shared/domain/contracts';
import { ProductName } from '..';

export class ProductNameYupValidator implements Validator<ProductName> {
  public validate(entity: ProductName): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().max(1).min(1).required()
        })
        .validateSync(
          {
            name: entity.name
          },
          {
            abortEarly: false
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach(error => {
        entity.notification.addError({
          context: 'product-name',
          message: error
        });
      });
    }
  }
}
