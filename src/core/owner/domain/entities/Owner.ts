import { Document } from '@core/shared/domain/value_objects';
import { Entity } from '@core/shared/domain/entity';
import { ValidationException } from '@core/shared/data/contracts';
import { ValidatorNotAvailableException } from '@core/shared/data/contracts/exceptions';
import { Validator } from '@core/shared/domain/contracts';

export class Owner extends Entity {
  name!: string;

  document!: Document;

  constructor(
    props: Partial<Owner>,
    private readonly validator: Validator<Owner>
  ) {
    super();

    Object.assign(this, props);

    this.validateOwner();

    if (this.validation.hasErrors()) {
      throw new ValidationException(this.validation.messages('owner'));
    }
  }

  private validateOwner() {
    if (!this.validator) {
      throw new ValidatorNotAvailableException('Owner Validator not available');
    }
    this.validator.validate(this);
  }
}
