import { Validator } from '@core/shared/domain/contracts';
import { Price } from '..';
import { PriceYupValidator } from '../validator';

export class PriceValidatorFactory {
  static create(): Validator<Price> {
    return new PriceYupValidator();
  }
}
