import { Document } from '@core/shared/domain/value_objects';
import { Entity } from '@core/shared/domain/entity';
import { ValidationException } from '@core/shared/data/contracts';
import { ValidatorNotAvailableException } from '@core/shared/data/contracts/exceptions';
import { Validator } from '@core/shared/domain/contracts';

export class Owner extends Entity {
  name!: string;

  document!: Document;

  #validator: Validator<this>;

  constructor(props: Partial<Owner>, validator: Validator<Owner>) {
    super();

    this.#validator = validator;

    Object.assign(this, props);

    this.validateOwner();

    if (this.notification.hasErrors()) {
      throw new ValidationException(this.notification.messages('owner'));
    }
  }

  private validateOwner() {
    if (!this.#validator) {
      throw new ValidatorNotAvailableException('Owner Validator not available');
    }
    this.#validator.validate(this);
  }
}
