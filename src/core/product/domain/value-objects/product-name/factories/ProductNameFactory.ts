import { Entity } from '@core/shared/domain/entity';
import { ProductName } from '..';
import { ProductNameProps } from '../types';
import { ProductNameValidatorFactory } from './ProductNameValidatorFactory';

export class ProductNameFactory {
  static create(props: ProductNameProps, entity: Entity): ProductName {
    return new ProductName(entity, props, ProductNameValidatorFactory.create());
  }
}
