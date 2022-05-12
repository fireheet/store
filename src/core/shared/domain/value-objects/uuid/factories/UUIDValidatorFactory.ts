import { Validator } from '@core/shared/domain/contracts';
import { UUID } from '../UUID';
import { UUIDYupValidator } from '../validator/UUIDYupValidator';

export class UUIDValidatorFactory {
  static create(): Validator<UUID> {
    return new UUIDYupValidator();
  }
}
