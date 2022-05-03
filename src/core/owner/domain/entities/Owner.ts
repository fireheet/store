import { Document } from '@core/shared/domain/value-objects';
import { Entity } from '@core/shared/domain/entity';
import { ValidationException } from '@core/shared/data/contracts';
import { InvalidValidatorException } from '@core/shared/data/contracts/exceptions';
import { Validator } from '@core/shared/domain/contracts';

export class Owner extends Entity {
  name!: string;

  document!: Document;

  // Stryker disable next-line all
  constructor(
    props: Partial<Owner>,
    private readonly validator: Validator<Owner>
  ) {
    super();

    Object.assign(this, props);

    this.#validateOwner();

    if (this.notification.hasErrors()) {
      throw new ValidationException(this.notification.messages('owner'));
    }
  }

  #validateOwner() {
    /* istanbul ignore next */
    if (!this.validator) {
      /* istanbul ignore next */
      throw new InvalidValidatorException('Owner Validator is invalid.');
    }

    this.validator.validate(this);
  }
}
