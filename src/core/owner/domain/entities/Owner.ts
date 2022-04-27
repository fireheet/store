import { Document } from '@core/shared/domain/value_objects';
import { Entity } from '@core/shared/domain/entity';
import { ValidationException } from '@core/shared/data/contracts';
import { InvalidValidatorException } from '@core/shared/data/contracts/exceptions';
import { Validator } from '@core/shared/domain/contracts';

export class Owner extends Entity {
  name!: string;

  document!: Document;

  #validator: Validator<this>;

  // Stryker disable next-line all
  constructor(props: Partial<Owner>, validator: Validator<Owner>) {
    super();

    if (!validator) {
      throw new InvalidValidatorException('Owner Validator is invalid.');
    }

    this.#validator = validator;

    Object.assign(this, props);

    this.#validator.validate(this);

    if (this.notification.hasErrors()) {
      throw new ValidationException(this.notification.messages('owner'));
    }
  }
}
