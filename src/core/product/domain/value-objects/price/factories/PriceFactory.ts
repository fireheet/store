import { Entity } from '@core/shared/domain/entity';
import { Price } from '../Price';
import { PriceProps } from '../types';
import { PriceValidatorFactory } from './PriceValidatorFactory';

export class PriceFactory {
  static create(props: PriceProps, entity: Entity): Price {
    return new Price(entity, props, PriceValidatorFactory.create());
  }
}
