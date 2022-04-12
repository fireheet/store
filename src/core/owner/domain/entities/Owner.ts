/* eslint-disable import/no-cycle */
import { Document } from '@core/shared/domain/value_objects';
import { Entity } from '@core/shared/domain/entity';
import { OwnerValidatorFactory } from '../factories/validator/OwnerValidatorFactory';
import { ValidationException } from '../../../shared/data/contracts/exceptions/ValidationException';

export class Owner extends Entity {
  name!: string;

  document!: Document;

  constructor(props: Partial<Owner>) {
    super('owner');

    Object.assign(this, props);

    this.validateOwner();

    if (this.validation.hasErrors()) {
      throw new ValidationException(this.validation.messages());
    }
  }

  private validateOwner() {
    OwnerValidatorFactory.create().validate(this);
  }
}
