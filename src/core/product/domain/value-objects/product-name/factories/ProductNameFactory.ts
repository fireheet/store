import { InvalidParameterException } from '@core/shared/data/contracts';
import { ProductName } from '..';
import { ProductNameProps } from '../types/ProductNameProps';
import { ProductNameValidatorFactory } from './ProductNameValidatorFactory';

export class ProductNameFactory {
  static create({ name }: ProductNameProps): ProductName {
    if (!name) {
      throw new InvalidParameterException('product name');
    }

    return new ProductName({ name }, ProductNameValidatorFactory.create());
  }
}
