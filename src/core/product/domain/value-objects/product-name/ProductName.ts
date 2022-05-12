import {
  InvalidValidatorException,
  ValidationException
} from '@core/shared/data/contracts';
import { ValueObject } from '@core/shared/domain/value-objects/ValueObject';
import { Validator } from '@core/shared/domain/contracts';

export class ProductName extends ValueObject {
  name!: string;

  constructor(
    props: Partial<ProductName>,
    private readonly validator: Validator<ProductName>
  ) {
    super();

    Object.assign(this, props);

    this.#validateProductName();

    if (this.notification.hasErrors()) {
      throw new ValidationException(this.notification.messages('product-name'));
    }
  }

  #validateProductName(): void {
    /* istanbul ignore next */
    if (!this.validator) {
      /* istanbul ignore next */
      throw new InvalidValidatorException('Product Name Validator is invalid.');
    }

    this.validator.validate(this);
  }
}
