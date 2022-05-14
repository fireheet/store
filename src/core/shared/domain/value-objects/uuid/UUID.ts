import { InvalidValidatorException } from '@core/shared/data/contracts';
import { Validator } from '@core/shared/domain/contracts';
import { UUIDProps } from './types/UUIDProps';

export class UUID {
  id!: string;

  version!: string;

  constructor(data: UUIDProps, private readonly validator: Validator<UUID>) {
    Object.assign(this, data);
  }

  public validateUUID(): void {
    /* istanbul ignore next */
    if (!this.validator) {
      /* istanbul ignore next */
      throw new InvalidValidatorException('UUID Validator is invalid.');
    }

    this.validator.validate(this);
  }
}
