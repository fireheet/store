import {
  InvalidValidatorException,
  ValidationException
} from '@core/shared/data/contracts';
import { ValueObject } from '@core/shared/domain/value-objects/ValueObject';
import { Validator } from '@core/shared/domain/contracts';

export class Price extends ValueObject {
  value!: string;

  constructor(
    props: Partial<Price>,
    private readonly validator: Validator<Price>
  ) {
    super();

    Object.assign(this, props);

    this.#validatePrice();

    if (this.notification.hasErrors()) {
      throw new ValidationException(this.notification.messages('price'));
    }
  }

  #validatePrice(): void {
    /* istanbul ignore next */
    if (!this.validator) {
      /* istanbul ignore next */
      throw new InvalidValidatorException('Price Validator is invalid.');
    }

    this.validator.validate(this);
  }
}
