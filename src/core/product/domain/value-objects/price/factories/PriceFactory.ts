import { InvalidParameterException } from '@core/shared/data/contracts';
import { Price } from '../Price';
import { PriceProps } from '../types';
import { PriceValidatorFactory } from './PriceValidatorFactory';

export class PriceFactory {
  static create({ value }: PriceProps): Price {
    if (!value) {
      throw new InvalidParameterException('value');
    }

    return new Price({ value }, PriceValidatorFactory.create());
  }
}
