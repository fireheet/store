import { Validator } from '@core/shared/domain/contracts';
import { ProductName } from '..';
import { ProductNameYupValidator } from '../validator';

export class ProductNameValidatorFactory {
  static create(): Validator<ProductName> {
    return new ProductNameYupValidator();
  }
}
