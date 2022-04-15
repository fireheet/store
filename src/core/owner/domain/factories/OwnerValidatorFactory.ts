import { Owner } from '@core/owner/domain/entities';
import { OwnerYupValidator } from '@core/owner/domain/validator';
import { Validator } from '@core/shared/domain/contracts';

export class OwnerValidatorFactory {
  static create(): Validator<Owner> {
    return new OwnerYupValidator();
  }
}
