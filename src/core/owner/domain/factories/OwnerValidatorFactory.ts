/* eslint-disable import/no-cycle */
import { Validator } from '@core/shared/data';
import { Owner } from '@core/owner/domain/entities';
import { OwnerYupValidator } from '@core/owner/domain/validator';

export class OwnerValidatorFactory {
  static create(): Validator<Owner> {
    return new OwnerYupValidator();
  }
}
