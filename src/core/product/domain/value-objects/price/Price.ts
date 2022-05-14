import { InvalidValidatorException } from '@core/shared/data/contracts';
import { ValueObject } from '@core/shared/domain/value-objects/ValueObject';
import { Validator } from '@core/shared/domain/contracts';
import { Entity } from '@core/shared/domain/entity';

export class Price extends ValueObject {
  value!: number;

  constructor(
    entity: Entity,
    props: Partial<Price>,
    private readonly validator: Validator<Price>
  ) {
    super(entity);

    Object.assign(this, props);

    this.#validatePrice();
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
