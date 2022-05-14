import { InvalidValidatorException } from '@core/shared/data/contracts';
import { ValueObject } from '@core/shared/domain/value-objects/ValueObject';
import { Validator } from '@core/shared/domain/contracts';
import { Entity } from '@core/shared/domain/entity';

export class ProductName extends ValueObject {
  name!: string;

  constructor(
    entity: Entity,
    props: Partial<ProductName>,
    private readonly validator: Validator<ProductName>
  ) {
    super(entity);

    Object.assign(this, props);

    this.#validateProductName();
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
