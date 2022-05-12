import {
  InvalidValidatorException,
  ValidationException
} from '@core/shared/data/contracts';
import { ValueObject } from '@core/shared/domain/value-objects/ValueObject';
import { Validator } from '@core/shared/domain/contracts';
import { UUIDProps } from './types/UUIDProps';

export class UUID extends ValueObject {
  id!: string;

  version!: string;

  constructor(data: UUIDProps, private readonly validator: Validator<UUID>) {
    super();

    Object.assign(this, data);

    this.#validateUUID();

    if (this.notification.hasErrors()) {
      throw new ValidationException(this.notification.messages('uuid'));
    }
  }

  #validateUUID(): void {
    /* istanbul ignore next */
    if (!this.validator) {
      /* istanbul ignore next */
      throw new InvalidValidatorException('UUID Validator is invalid.');
    }

    this.validator.validate(this);
  }
}
